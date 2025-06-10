import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';

export const createtoken = (user) => {  
    return new Promise((resolve, reject) => {
        jwt.sign({ id: user._id}, env.jwt_secret, { expiresIn: 86400 }, (err, token) => {
            if(err) reject(err);
            resolve(token);
        });
    })
}