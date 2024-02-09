import express from 'express';

import { isAuthenicationedUser } from '../middlewares/auth';
import { createProduct, getAllProduct, getProductById } from "../controllers/ProductController";


export default (router: express.Router) => {

    router.route("/api/product").get(getAllProduct).post(createProduct);
    router.get('/api/product/:id', getProductById);
};