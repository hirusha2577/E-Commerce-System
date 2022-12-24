import { Router } from 'express';
import subCategoryController from '../controllers/subCategory.controller';
import { CreateSubCategoryDto } from '../dtos/subCategory.dto';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class SubCategoryRoute implements Routes {
  public path = '/subCategory';
  public router = Router();
  public subCategoryController = new subCategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.subCategoryController.getSubCategories);
    this.router.get(`${this.path}/:id`, this.subCategoryController.getSubCategoryByCategoryId);
    this.router.get(`${this.path}//:id`, this.subCategoryController.getSubCategoryById);
    this.router.post(`${this.path}`, validationMiddleware(CreateSubCategoryDto, 'body'), this.subCategoryController.createSubCategory);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateSubCategoryDto, 'body', true), this.subCategoryController.updateSubCategory);
    this.router.delete(`${this.path}/:id`, this.subCategoryController.deleteSubCategory);
  }
}

export default SubCategoryRoute;
