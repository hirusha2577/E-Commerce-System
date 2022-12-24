import { CreateSubCategoryDto } from '../dtos/subCategory.dto';
import { HttpException } from '../exceptions/HttpException';
import { SubCategory } from '@/interfaces/subCategory.interface';
import subCategoryModel from '../models/subCategory.model';
import { isEmpty } from '../utils/util';

class SubCategoryService {

  public subCategories = subCategoryModel;

  public async findAllSubCategories(): Promise<SubCategory[]> {
    const subCategories: SubCategory[] = await this.subCategories.find();
    return subCategories;
  }

  public async findSubCategoryByCategoryId(categoryId: string): Promise<SubCategory[]> {
    const findSubCategory: SubCategory[] = await this.subCategories.find({ categoryId: categoryId });
    return findSubCategory;
  }

  public async findSubCategoryById(subCategoryId: string): Promise<SubCategory> {
    if (isEmpty(subCategoryId)) throw new HttpException(400, "expenseId is empty");

    const findSubCategory: SubCategory = await this.subCategories.findOne({ _id: subCategoryId });
    if (!findSubCategory) throw new HttpException(409, "Expense doesn't exist");

    return findSubCategory;
  }

  public async createSubCategory(subCategoryData: CreateSubCategoryDto): Promise<SubCategory> {
    if (isEmpty(subCategoryData)) throw new HttpException(400, "expenseData is empty");

    const createSubCategoryData: SubCategory = await this.subCategories.create(subCategoryData);

    return createSubCategoryData;
  }

  public async updateSubCategory(subCategoryId: string, subCategoryData: CreateSubCategoryDto): Promise<SubCategory> {
    if (isEmpty(subCategoryData)) throw new HttpException(400, "expenseData is empty");

    const updateSubCategoryById: SubCategory = await this.subCategories.findByIdAndUpdate(subCategoryId,subCategoryData);
    if (!updateSubCategoryById) throw new HttpException(409, "Expense doesn't exist");

    return updateSubCategoryById;
  }

  public async deleteSubCategory(subCategoryId: string): Promise<SubCategory> {
    const deleteSubCategoryById: SubCategory = await this.subCategories.findByIdAndDelete(subCategoryId);
    if (!deleteSubCategoryById) throw new HttpException(409, "Expense doesn't exist");

    return deleteSubCategoryById;
  }
}

export default SubCategoryService;
