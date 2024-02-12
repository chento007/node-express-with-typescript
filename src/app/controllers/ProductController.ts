import { ProductService } from "../services/ProductService"
import { Request, Response } from "express";

export const getAllProduct = async (req: Request, res: Response) => {

    const products = await ProductService.getAll();
    return res.json({
        data: products
    })
}

export const getProductById = async (req: Request, res: Response) => {

    const product = await ProductService.getById(req.query.id as string);

    return res.json({
        message:"successa",
        data: product
    })
}


export const createProduct = async (req: Request, res: Response) => {
        
    const product = await ProductService.create({ ...req.body });

    return res.json({
        data: product
    })
}