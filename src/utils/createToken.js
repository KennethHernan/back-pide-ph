import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';

export const createtoken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, env.jwt_secret, {
        expiresIn: 86400,
    });
}