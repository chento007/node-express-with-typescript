import { app } from './app';
import dotenv from 'dotenv';
import { ConnectDatabase } from '../src/config/connection_db';



dotenv.config({ path: ".env.development" });

ConnectDatabase();

const server = app.listen(3000, () => {
    console.log(`This server running on : ${process.env.PORT}`)
});

// handle unhandle error
process.on("unhandledRejection", (err:any) => {

    console.log("error : ", err.message);
    console.log("Shutting down the server dur to handled promiss rejection");

    server.close(() => {
        process.exit(1);
    })
})
