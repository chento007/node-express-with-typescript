import { Product } from "../models/products"
import { CreateProductDTO } from "../DTO/productDTO/CreateProductDTO"


/**
 * This class handle all Product Service
 */
export class ProductService {

    /**
     * get all product without limit
     * @returns list of product
     */
    static async getAll() {
        return await Product.find();
    }

    /**
     * This function find product by ProductId
     * @param id is product we need to find
     * @returns a single product if found
     */
    static async getById(id: string) {
        return await Product.findById({ _id: id });
    }

    /**
     * This function use to create the product
     * @param createDto there the data need to create
     * @returns a product that created
     */
    static async create(createDto: CreateProductDTO) {

        return await Product.create({
            description: createDto.description,
            photo: createDto.photo,
            title: createDto.title,
            price: createDto.price,
            user: createDto.user
        })
    }

    static async update(updateDto: CreateProductDTO, id: string) {

        const product = await Product.findByIdAndUpdate(
            id, { ...updateDto }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        return product;
    }

    static async delete(id: string) {

        const product = await Product.findByIdAndDelete(id)

        return product;
    }
}
