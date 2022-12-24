import { Router } from 'express';
import productController from '../controllers/product.controller';
import { CreateProductDto } from '../dtos/product.dto';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import multer from 'multer';
import { storage } from '../cloudinary/index.js';
const upload = multer({ storage });

class ProductRoute implements Routes {
  public path = '/product';
  public router = Router();
  public productController = new productController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productController.getProducts);
    this.router.get(`${this.path}/:id`, this.productController.getProductById);
    this.router.get(`${this.path}//:categoryId/:subCategoryId`, this.productController.getProductByCategoryIdAndSubCategoryId);
    this.router.post(`${this.path}`, upload.single("image"), this.productController.createProduct);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateProductDto, 'body', true), this.productController.updateProduct);
    this.router.delete(`${this.path}/:id`, this.productController.deleteProduct);
  }
}

export default ProductRoute;
