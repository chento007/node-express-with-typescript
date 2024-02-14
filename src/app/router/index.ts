import express from 'express';
import auth from './auth';
import product from "./product"
import file from "./file";
const router = express.Router();


export default (): express.Router => {

  auth(router);
  file(router);
  product(router);
  return router;
};