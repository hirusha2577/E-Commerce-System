import { CreateCategoryDto } from '../dtos/category.dto';
import { HttpException } from '../exceptions/HttpException';
import { Category } from '@/interfaces/category.interface';
import categoryModel from '../models/category.model';
import { isEmpty } from '../utils/util';

class CategoryService {

  public categories = categoryModel;

  public async findAllCategories(): Promise<Category[]> {
    const categories: Category[] = await this.categories.find();
    return categories;
  }

  public async findCategoryById(categoryId: string): Promise<Category> {
    if (isEmpty(categoryId)) throw new HttpException(400, "expenseId is empty");

    const findCategory: Category = await this.categories.findOne({ _id: categoryId });
    if (!findCategory) throw new HttpException(409, "Expense doesn't exist");

    return findCategory;
  }

  public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, "expenseData is empty");

    const findCategory: Category = await this.categories.findOne({ name: categoryData.name });
    if (findCategory) throw new HttpException(409, `This ${categoryData.name} category  already exists`);

    const createCategoryData: Category = await this.categories.create(categoryData);

    return createCategoryData;
  }

  public async updateCategory(categoryId: string, categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, "expenseData is empty");

    if (categoryData.name) {
      const findCategory: Category = await this.categories.findOne({ name: categoryData.name });
      if (findCategory && findCategory._id != categoryId) throw new HttpException(409, `${categoryData.name} this category expense already exists`);
    }

    const updateCategoryById: Category = await this.categories.findByIdAndUpdate(categoryId,categoryData);
    if (!updateCategoryById) throw new HttpException(409, "Expense doesn't exist");

    return updateCategoryById;
  }

  public async deleteCategory(categoryId: string): Promise<Category> {
    const deleteCategoryById: Category = await this.categories.findByIdAndDelete(categoryId);
    if (!deleteCategoryById) throw new HttpException(409, "Expense doesn't exist");

    return deleteCategoryById;
  }
}

export default CategoryService;
