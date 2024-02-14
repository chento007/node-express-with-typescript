import express from 'express';

import { isAuthenicationedUser } from '../middlewares/auth';
import { createProduct, deleteById, getAllProduct, getProductById, updateProduct } from "../controllers/ProductController";
import { upload } from '../controllers/FileController';


export default (router: express.Router) => {

    router.route("/api/product").get(isAuthenicationedUser, getAllProduct).post(isAuthenicationedUser, createProduct);
    router.route('/api/product/:id')
        .get(isAuthenicationedUser, getProductById)
        .delete(isAuthenicationedUser, deleteById)
        .put(isAuthenicationedUser, upload.single("image"), updateProduct)
};