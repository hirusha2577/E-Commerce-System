import { model, Schema, Document } from 'mongoose';
import { SubCategory } from '../interfaces/subCategory.interface';

const subCategorySchema: Schema = new Schema({
    categoryId: {
        type: String,
        required: true,
        unique: false
    },
    categoryName: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    }
});

const subCategoryModel = model<SubCategory & Document>('SubCategory', subCategorySchema);

export default subCategoryModel;
