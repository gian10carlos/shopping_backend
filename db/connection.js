const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = require('./config');
const { createPool } = require('mysql2');

const connection = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
});

connection.getConnection((err) => {
    if (err) {
        console.error('Error connection database ', err);
        return;
    }
    console.log('Connection Successful')
})

module.exports = connection;
