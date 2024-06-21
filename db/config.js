const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3005;
const DB_HOST = process.env.DB_HOST || "viaduct.proxy.rlwy.net";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "urtCuEECTXtVzvWmftoCWvxTzPwyysXE";
const DB_NAME = process.env.DB_NAME || "railway";
const DB_PORT = process.env.DB_PORT || 49064;

module.exports = { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT }