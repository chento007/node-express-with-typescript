import { app } from './app';
import dotenv from 'dotenv';
import { ConnectDatabase } from '../src/config/connection_db';



dotenv.config({ path: ".env.development" });

ConnectDatabase();

app.listen(3000, () => {
    console.log(`This server running on : ${process.env.PORT}`)
});