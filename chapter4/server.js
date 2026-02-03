import bcrypt from 'bcrypt';
import promptSync from 'prompt-sync';
import { MongoClient } from 'mongodb';

const dbUrl = 'mongodb://localhost:27017';
const client = new MongoClient(dbUrl);
const dbName = 'password_manager';

let authCollection;
let passwordsCollection;

const prompt = promptSync();

/**
 * Connect to MongoDB
 */
const main = async () => {
  try {
    await client.connect();
    console.log('✅ Connected successfully to MongoDB');

    const db = client.db(dbName);
    authCollection = db.collection('auth');
    passwordsCollection = db.collection('passwords');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

/**
 * Save master password to MongoDB
 */
const saveMasterPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);

  await authCollection.deleteMany({}); // keep only one master password
  await authCollection.insertOne({ type: 'master', hash });

  console.log('✅ Master password saved in MongoDB');
  showMenu();
};

/**
 * Get master password hash from MongoDB
 */
const getMasterHash = async () => {
  const doc = await authCollection.findOne({ type: 'master' });
  return doc?.hash || null;
};

/**
 * Verify master password
 */
const verifyMasterPassword = async (password) => {
  const hash = await getMasterHash();
  if (!hash) return false;
  return bcrypt.compare(password, hash);
};

/**
 * Prompt to create master password
 */
const promptNewPassword = async () => {
  const response = prompt('Enter a main password: ');
  await saveMasterPassword(response);
};

/**
 * Prompt to verify master password
 */
const promptOldPassword = async () => {
  let verified = false;

  while (!verified) {
    const response = prompt('Enter your password: ');
    const result = await verifyMasterPassword(response);

    if (result) {
      console.log('✅ Password verified.');
      verified = true;
      showMenu();
    } else {
      console.log('❌ Password incorrect. Try again.');
    }
  }
};

/**
 * Menu
 */
const showMenu = async () => {
  console.log(`
1. View passwords
2. Add new password
3. Verify master password
4. Exit
`);

  const response = prompt('> ');

  if (response === '1') await viewPasswords();
  else if (response === '2') await addNewPassword();
  else if (response === '3') await promptOldPassword();
  else if (response === '4') {
    console.log('👋 Bye!');
    process.exit(0);
  } else {
    console.log("❌ Invalid option.");
    showMenu();
  }
};

/**
 * View passwords from MongoDB
 */
const viewPasswords = async () => {
  const passwords = await passwordsCollection.find().toArray();

  if (passwords.length === 0) {
    console.log('📭 No passwords saved.');
  } else {
    console.log('\n🔐 Saved Passwords:');
    passwords.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} => ${item.password}`);
    });
  }

  showMenu();
};

/**
 * Add new password to MongoDB
 */
const addNewPassword = async () => {
  const name = prompt('Enter name for password: ');
  const password = prompt('Enter password to save: ');

  await passwordsCollection.insertOne({ name, password });

  console.log(`✅ Password for "${name}" saved in MongoDB`);
  showMenu();
};

/**
 * App start
 */
await main();

const masterHash = await getMasterHash();

if (!masterHash) {
  await promptNewPassword();
} else {
  await promptOldPassword();
}
