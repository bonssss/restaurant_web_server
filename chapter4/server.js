import bcrypt from 'bcrypt';
import promptSync from 'prompt-sync';

const prompt = promptSync();

/**
 * Mock database
 */
const mockDB = {
  hash: null,
  passwords: {}
};

/**
 * Save master password
 */
const saveNewPassword = (password) => {
  mockDB.hash = bcrypt.hashSync(password, 10);
  console.log('Password saved to mockDB');
  showMenu();
};

/**
 * Compare password with hash
 */
const compareHashedPassword = async (password) => {
  return bcrypt.compare(password, mockDB.hash);
};

/**
 * Prompt to create master password
 */
const promptNewPassword = () => {
  const response = prompt('Enter a main password: ');
  saveNewPassword(response);
};

/**
 * Prompt to verify master password
 */
const promptOldPassword = async () => {
  let verified = false;

  while (!verified) {
    const response = prompt('Enter your password: ');
    const result = await compareHashedPassword(response);

    if (result) {
      console.log('Password verified.');
      verified = true;
      showMenu();
    } else {
      console.log('Password incorrect. Try again.');
    }
  }
};

/**
 * Menu
 */
const showMenu = async () => {
  console.log(`
1. View passwords
2. Manage new password
3. Verify password
4. Exit
`);

  const response = prompt('> ');

  if (response === '1') viewPasswords();
  else if (response === '2') promptManageNewPassword();
  else if (response === '3') await promptOldPassword();
  else if (response === '4') process.exit(0);
  else {
    console.log("That's an invalid response.");
    showMenu();
  }
};

/**
 * View passwords
 */
const viewPasswords = () => {
  const passwords = mockDB.passwords;

  if (Object.keys(passwords).length === 0) {
    console.log('No passwords saved.');
  } else {
    Object.entries(passwords).forEach(([key, value], index) => {
      console.log(`${index + 1}. ${key} => ${value}`);
    });
  }

  showMenu();
};

/**
 * Add new password
 */
const promptManageNewPassword = () => {
  const source = prompt('Enter name for password: ');
  const password = prompt('Enter password to save: ');

  mockDB.passwords[source] = password;
  console.log(`Password for ${source} has been saved!`);
  showMenu();
};

/**
 * App start
 */
if (!mockDB.hash) {
  promptNewPassword();
} else {
  promptOldPassword();
}
