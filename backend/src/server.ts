import App from './app';

import CategoryRoute from './routes/category.route';
import SubCategoryRoute from './routes/subCategory.route';
import ProductRoute from './routes/product.route';


const app = new App([ new CategoryRoute(), new SubCategoryRoute(), new ProductRoute()]);

app.listen();