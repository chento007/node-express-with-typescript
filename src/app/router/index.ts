import express from 'express';
import auth from './AuthRouter';
import product from "./ProductRouter"
const router = express.Router();


export default (): express.Router => {

  auth(router);
  product(router);
  return router;
};