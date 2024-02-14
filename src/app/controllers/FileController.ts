import { Request, Response } from "express";
import { catchAsyncError } from '../middlewares/catchAsyncErrors';
import { BaseRest } from '../base/BaseRest';
import { v4 as uuidv4 } from 'uuid';

import multer from "multer"
import { FileService } from "../services/FileService";

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];


export const upload = multer({
    storage: multer.diskStorage({
        destination: function (req: Request, file: Express.Multer.File, cb) {
            cb(null, process.env.IMAGE_PATH);
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + "_" + file.originalname);
        }

    })
});

export const uploadImage = catchAsyncError(async (req: Request, res: Response) => {

    if (!req.file) {

        return res.status(400).json(new BaseRest({
            status: false,
            code: 400,
            message: "Thumbnail is required.",
        }))
    }
    if (!allowedTypes.includes(req.file.mimetype)) {

        return res.status(400).json(new BaseRest({
            status: false,
            code: 400,
            message: "Invalid file type.",
        }))
    }

    const file = FileService.uploadImage(req.file);
    return res.status(200).json(new BaseRest({
        status: true,
        code: 200,
        message: "You have upload successfully.",
        data: file
    }))
})