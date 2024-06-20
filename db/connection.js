const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' });

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

connection.connect((err) => {
    if (err) {
        throw 'Error connection database', err;
    }
    console.log('Connection successful database');
});
module.exports = connection;
