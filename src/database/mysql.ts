import mysql from 'mysql2'
import { DB_URL, DB_USER, DB_PASSWORD, DB_NAME } from '../config/config.js';

const connection = await mysql.createConnection({
    host: DB_URL,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

export default connection