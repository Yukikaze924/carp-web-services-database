import express from 'express'
import cors from 'cors'
import connection from './database/mysql.js'
import config from './config/config.js'
import { user } from './types/user.js'

// const app = express()
// const ipAddress: string = config.HOST_URL
// const port: number = config.HOST_PORT
// const corsOptions =
// {
//     origin: '*',
//     optionsSuccessStatus: 200 // 对于一些旧版浏览器的兼容处理
// };

export class Main
{
    private static instance: Main
    private static app = express()
    private static ipAddress: string = config.HOST_URL
    private static port: number = config.HOST_PORT
    private static corsOptions =
    {
        origin: '*',
        optionsSuccessStatus: 200 // 对于一些旧版浏览器的兼容处理
    }

    public static main(args: string[]): void
    { 
        console.log({ ...args });
        
        if (!args.includes('--skip-mysql'))
        {
            connection.connect(err => {
                if (err) {
                    console.error('Error connecting to MySQL:', err.stack);
                    return;
                }
                console.log('Connected to MySQL as id', connection.threadId);
            });
        }

        this.app.use(cors(this.corsOptions), express.json()) // JSON中间件不传就会解析不了Body - 返回undefined // cors解决跨域请求安全政策

        this.app.get('/user/:account', (req, res) =>
        {
            const account = req.params.account
            connection.query(`SELECT * FROM users WHERE account='${account}'`, (error, results) => {
                if (error) {
                    return res.status(500).send(error);
                }
                const user = results[0]
                const base64String = (Buffer.from(user.avatar).toString())
                user.avatar=base64String
                res.status(200).json(user)
            })
        })

        this.app.post('/user', (req, res) =>
        {
            const user = req.body;
            console.log(user);

            // 验证对象格式
            if (this.instance.validateUser(user))
            {
                res.status(200).send(`Received valid user object: ${JSON.stringify(user)}`);
            }
            else
            {
                res.status(400).send('Invalid user object format');
            }
            // TODO: Mysql 注册账户
        })

        this.app.post('/avatar/:account', (req, res) =>
        {
            const account = req.params.account
            const image = req.body

            // 更新数据库中的数据
            const query = 'UPDATE users SET avatar = ? WHERE account = ?';
            connection.query(query, [image, account], (error: any, results: any, fields: any) => {
                if (error) {
                    console.error('Error updating data: ', error);
                    res.status(500).send('Error updating data');
                    return;
                }
                res.send('Data updated successfully');
            });
        })
            
        this.app.listen(this.port, this.ipAddress, () => {
            console.log(`Application listening on [${this.ipAddress}]:${this.port}`)
        })
    }

    private validateUser(user: user)
    {
        const requiredKeys = ['account', 'nickname', 'password'];
        return requiredKeys.every(key => user.hasOwnProperty(key));
    }
}