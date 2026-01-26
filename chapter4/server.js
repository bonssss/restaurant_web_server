import bcrybt from 'bcrypt';

const password = 'mySecurePassword';

const hash = bcrybt.hashSync(password, 10);
console.log('Hashed Password:', hash);
