import { ProductService } from "../services/ProductService"
import { Request, Response } from "express";

export const getAllProduct = async (req: Request, res: Response) => {

    const products = await ProductService.getAll();
    return res.json({
        data: products
    })
}

export const getProductById = async (req: Request, res: Response) => {

    const product = await ProductService.getById(req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "not found",
            status: 404
        })
    }

    return res.status(404).json({
        message: "success",
        status: 200,
        data: product
    })
}


export const createProduct = async (req: Request, res: Response) => {

    const product = await ProductService.create({ ...req.body });

    return res.json({
        data: product
    })
}

export const updateProduct = async (req: Request, res: Response) => {

    const isIdExist = await ProductService.getById(req.params.id);
    if (!isIdExist) {
        return res.status(404).json({
            message: "Id not found",
            status: 404
        })
    }

    const product = await ProductService.update({ ...req.body }, req.params.id);
    console.log(product);
    if (product) {
        return res.status(200).json({
            message: "Update success",
            status: 200,
            data: product
        })
    }

    return res.status(500).json({
        message: "Something went wrong please try again.",
        status: 500
    })
}


export const deleteById = async (req: Request, res: Response) => {

    const isIdExist = await ProductService.getById(req.params.id);
    if (!isIdExist) {
        return res.status(404).json({
            message: "Id not found",
            status: 404
        })
    }

    const deleteProduct = await ProductService.delete(req.params.id);
    if (deleteProduct) {
        return res.status(200).json({
            message: "Delete success",
            status: 200,
            data: deleteProduct
        })
    }

    return res.status(500).json({
        message: "Something went wrong please try again.",
        status: 500
    })
}