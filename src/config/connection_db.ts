import { DataSource } from "typeorm";

// Using environment variables
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: ".env.development" });

export const ConnectDatabase = () => mongoose.connect(process.env.DB_URL, {
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 
})
    .then(con => {
        console.log("MONGO database connect with house:", con.connection.host)
    }).catch(err => console.log("Couldn't connect to", err))

