import { NextFunction, Request, Response } from 'express';
import { CreateSubCategoryDto } from '../dtos/subCategory.dto';
import { SubCategory } from '../interfaces/subCategory.interface';
import subCategoryService from '../services/subCategory.service';

class SubCategoryController {
  public subCategoryService = new subCategoryService();

  public getSubCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSubCategoriesData: SubCategory[] = await this.subCategoryService.findAllSubCategories();

      res.status(200).json({ data: findAllSubCategoriesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSubCategoryByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId: string = req.params.id;
      const findSubCategoryData: SubCategory[] = await this.subCategoryService.findSubCategoryByCategoryId(categoryId);

      res.status(200).json({ data: findSubCategoryData, message: 'find' });
    } catch (error) {
      next(error);
    }
  };

  public getSubCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subCategoryId: string = req.params.id;
      const findOneSubCategoryData: SubCategory = await this.subCategoryService.findSubCategoryById(subCategoryId);

      res.status(200).json({ data: findOneSubCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subCategoryData: CreateSubCategoryDto = req.body;
      const createSubCategoryData: SubCategory = await this.subCategoryService.createSubCategory(subCategoryData);

      res.status(201).json({ data: createSubCategoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subCategoryId: string = req.params.id;
      const subCategoryData: CreateSubCategoryDto = req.body;
      const updateSubCategoryData: SubCategory = await this.subCategoryService.updateSubCategory(subCategoryId, subCategoryData);

      res.status(200).json({ data: updateSubCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subCategoryId: string = req.params.id;
      const deleteSubCategoryData: SubCategory = await this.subCategoryService.deleteSubCategory(subCategoryId);

      res.status(200).json({ data: deleteSubCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SubCategoryController;
