import express from "express";
import bodyParser from "body-parser";
import router from './app/router';
import cors from "cors"; // Corrected import
import { handleMidlewareError } from "../src/app/middlewares/errors";

const app = express();

app.use(cors())

app.use(express.json())
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

/**
 * primary route
 */
app.use('/', router());

app.use(handleMidlewareError)


export { app }

