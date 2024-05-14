const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
import bcrypt from 'bcryptjs'

import { apiHandler } from 'helpers/api';
import conn from './../../../data/postgres';

const { serverRuntimeConfig } = getConfig();

// users in JSON file for simplicity, store in a db for production applications
const users = require('data/users.json');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function authenticate() {
        const { username, password } = req.body;

        const userInfo = await conn.query(`
                SELECT *
                FROM users
                WHERE email = $1
                `, [username]
            );
            
        const logged = bcrypt.compareSync(password, userInfo.rows[0].password)

        if (!userInfo.rows[0].id || !logged) throw 'Username or password is incorrect';
    
        // create a jwt token that is valid for 7 days
        const token = jwt.sign({ sub: userInfo.rows[0].id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
    
        // return basic user details and token
        return res.status(200).json({
            id: userInfo.rows[0].id,
            username: userInfo.rows[0].email,
            name: userInfo.rows[0].name,
            token
        });
    }
}
