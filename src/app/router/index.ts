import express from 'express';
import auth from './auth';
import product from "./product"
const router = express.Router();


export default (): express.Router => {

  auth(router);
  product(router);
  return router;
};