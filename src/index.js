import http from 'http';
import app from './app.js';
import { env } from './config/environment.js';
import db from "./database.js"

const server = http.createServer(app)


 .listen(env.PORT)
  .on('listening', () => console.log(`http://${env.IP}:${env.PORT}`))
  .on('error', (error) => {
    console.log(error);
    process.exit(1);
  });