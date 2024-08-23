import mysql, { Pool } from 'mysql2';
import { DB_URL, DB_USER, DB_PASSWORD, DB_NAME } from '../config/config.js';


// 创建连接池，设置连接池的参数
const pool: Pool = mysql.createPool({
    host: DB_URL,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // 最大空闲连接数，默认等于 `connectionLimit`
    idleTimeout: 60000, // 空闲连接超时，以毫秒为单位，默认值为 60000 ms
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export default pool