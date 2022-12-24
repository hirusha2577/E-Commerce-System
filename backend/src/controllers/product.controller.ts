import { NextFunction, Request, Response } from 'express';
import { CreateProductDto } from '../dtos/product.dto';
import { Product } from '../interfaces/product.interface';
import productService from '../services/product.service';
import productModel from '../models/product.model';
interface MulterRequest extends Request {
  file: any;
}
class ProductController {
  public productService = new productService();

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductsData: Product[] = await this.productService.findAllProduct();

      res.status(200).json({ data: findAllProductsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const findOneProductData: Product = await this.productService.findProductById(productId);

      res.status(200).json({ data: findOneProductData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getProductByCategoryIdAndSubCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId: string = req.params.categoryId;
      const subCategoryId: string = req.params.subCategoryId;
      const findProductData: Product[] = await this.productService.findProductByCategoryIdAndSubCategoryId(categoryId,subCategoryId);

      res.status(200).json({ data: findProductData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
    const categoryId = req.body.categoryId.split(",");
    const subCategoryId = req.body.subCategoryId.split(",");
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    let image = "";
    if (req.file !== undefined) {
        image = req.file.path
    }
    let newProduct = new productModel({
      categoryId, subCategoryId, name, description, price, image
  })

      const createProductData: Product = await this.productService.createProduct(newProduct);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const productData: CreateProductDto = req.body;
      const updateProductData: Product = await this.productService.updateProduct(productId, productData);

      res.status(200).json({ data: updateProductData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const deleteProductData: Product = await this.productService.deleteProduct(productId);

      res.status(200).json({ data: deleteProductData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
