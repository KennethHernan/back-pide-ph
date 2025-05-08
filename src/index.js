import http from 'http';
import app from './app.js';
import { env } from './config/environment.js';
import db from "./database.js"

const server = http.createServer(app)

server
    .listen(env.PORT)
    .on('listening', () => console.log(`http://192.168.2.14:${env.PORT}`))
    .on('error', (error) => {
        console.log(error)
        process.exit(1)
    })
