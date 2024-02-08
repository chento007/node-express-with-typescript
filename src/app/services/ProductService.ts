import { Product } from "../models/products"
import { CreateProductDTO } from "../DTO/productDTO/CreateProductDTO"
export class ProductService {

    static async getAll() {
        return await Product.find();
    }

    static async getById(id: string) {
        return await Product.findById({ id: id });
    }

    static async create(createDto: CreateProductDTO) {

        return await Product.create({
            description: createDto.description,
            photo: createDto.photo,
            title: createDto.title,
            user: createDto.user
        })
    }
}