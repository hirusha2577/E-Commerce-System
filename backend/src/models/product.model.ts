import { model, Schema, Document } from 'mongoose';
import { Product } from '../interfaces/product.interface';

const productSchema: Schema = new Schema({
    categoryId: {
        type: Array,
        required: true,
        unique: false
    },
    subCategoryId: {
        type: Array,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    price: {
        type: String,
        required: true,
        unique: false
    },
    image: {
        type: String,
        required: false,
        unique: false
    }
});

const productModel = model<Product & Document>('Product', productSchema);

export default productModel;
