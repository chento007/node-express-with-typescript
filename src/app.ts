import express from "express";
import bodyParser from "body-parser";
import router from './app/router';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/', router());


export {app}

