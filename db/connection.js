const mysql = require('mysql')
const dotenv = require('dotenv')

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = require('./config');

dotenv.config({ path: './.env' });

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
});

connection.connect((err) => {
    if (err) {
        throw 'Error connection database', err;
    }
    console.log('Connection successful database');
});
module.exports = connection;
