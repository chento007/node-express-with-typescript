import { ProductService } from "../services/ProductService"
import { Request, Response } from "express";
import { catchAsyncError } from '../middlewares/catchAsyncErrors';
import { BaseRest } from '../base/BaseRest';

export const getAllProduct = catchAsyncError(async (req: Request, res: Response) => {

    const products = await ProductService.getAll();

    return res.status(200).json(
        new BaseRest({
            status: true,
            code: 200,
            message: "You have retrive your products successfully.",
            data: products
        })
    )
})

export const getProductById = catchAsyncError(async (req: Request, res: Response) => {

    const product = await ProductService.getById(req.params.id);
    if (!product) {
        return res.status(404).json(
            new BaseRest({
                status: false,
                code: 404,
                message: `Product with id ${req.params.id} it not found`,
                data: product
            })
        )
    }


    return res.status(200).json(
        new BaseRest({
            status: true,
            code: 200,
            message: "You have retrive your product successfully.",
            data: product
        })
    )
})

export const createProduct = catchAsyncError(async (req: Request, res: Response) => {

    const product = await ProductService.create({ ...req.body });

    return res.status(200).json(
        new BaseRest({
            status: true,
            code: 200,
            message: "You have create your product successfully.",
            data: product
        })
    )
})

export const updateProduct = catchAsyncError(async (req: Request, res: Response) => {

    const isIdExist = await ProductService.getById(req.params.id);
    if (!isIdExist) {
        return res.status(404).json({
            message: "Id not found",
            status: 404
        })
    }

    const product = await ProductService.update({ ...req.body }, req.params.id);
    if (product) {
        return res.status(200).json(
            new BaseRest({
                status: true,
                code: 200,
                message: "You have update your product successfully.",
                data: product
            })
        )
    }

    return res.status(500).json({
        message: "Something went wrong please try again.",
        status: 500
    })


})

export const deleteById = catchAsyncError(async (req: Request, res: Response) => {

    const isIdExist = await ProductService.getById(req.params.id);
    if (!isIdExist) {
        return res.status(404).json({
            message: "Id not found",
            status: 404
        })
    }

    const deleteProduct = await ProductService.delete(req.params.id);
    if (deleteProduct) {

        return res.status(200).json(
            new BaseRest({
                status: true,
                code: 200,
                message: "You have update your product successfully.",
                data: ''
            })
        )
    }

    return res.status(500).json({
        message: "Something went wrong please try again.",
        status: 500
    })
})