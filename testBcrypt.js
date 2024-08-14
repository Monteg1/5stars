const bcrypt = require('bcryptjs');

const password = 'testpass';
const saltRounds = 10;

async function testBcrypt() {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('Original password:', password);
        console.log('Hashed password:', hashedPassword);

        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log('Do they match?', isMatch);
    } catch (error) {
        console.error('Error with bcryptjs:', error);
    }
}

testBcrypt();