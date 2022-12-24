import { CreateProductDto } from '../dtos/product.dto';
import { HttpException } from '../exceptions/HttpException';
import { Product } from '@/interfaces/product.interface';
import productModel from '../models/product.model';
import { isEmpty } from '../utils/util';

class ProductService {

  public products = productModel;

  public async findAllProduct(): Promise<Product[]> {
    const products: Product[] = await this.products.find();
    return products;
  }

  public async findProductById(productId: string): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, "expenseId is empty");

    const findProduct: Product = await this.products.findOne({ _id: productId });
    if (!findProduct) throw new HttpException(409, "Expense doesn't exist");

    return findProduct;
  }

  public async findProductByCategoryIdAndSubCategoryId(categoryID: string, subCategoryID: string): Promise<Product[]> {
    const findProduct: Product[] = await this.products.find({ categoryId: categoryID, subCategoryId:subCategoryID});
    if (!findProduct) throw new HttpException(409, "Expense doesn't exist");
    return findProduct;
  }

  public async createProduct(productData: Product): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "expenseData is empty");
    const createProductData: Product = await this.products.create(productData);
    return createProductData;
  }

  public async updateProduct(productId: string, productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "expenseData is empty");

    const updateProductById: Product = await this.products.findByIdAndUpdate(productId,productData);
    if (!updateProductById) throw new HttpException(409, "Expense doesn't exist");

    return updateProductById;
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const deleteProductById: Product = await this.products.findByIdAndDelete(productId);
    if (!deleteProductById) throw new HttpException(409, "Expense doesn't exist");

    return deleteProductById;
  }
}

export default ProductService;
