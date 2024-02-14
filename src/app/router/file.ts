import express from 'express';

import { uploadImage, upload } from "../controllers/FileController"
import { isAuthenicationedUser } from '../middlewares/auth';

export default (router: express.Router) => {

    router.post("/api/files/upload-image", isAuthenicationedUser, upload.single("file"), uploadImage);

};