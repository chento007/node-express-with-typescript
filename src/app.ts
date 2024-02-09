import express from "express";
import bodyParser from "body-parser";
import router from './app/router';
import cors from "cors"; // Corrected import

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * primary route
 */
app.use('/', router());


export { app }

