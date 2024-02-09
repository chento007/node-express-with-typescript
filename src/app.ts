import express from "express";
import bodyParser from "body-parser";
import router from './app/router';
import corse from "cors"

const app = express();

app.use(corse())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * primary route
 */
app.use('/', router());


export { app }

