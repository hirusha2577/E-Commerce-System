import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';


import Index from './pages/index';
import Category from './pages/admin/category';
import SubCategory from './pages/admin/sub-category';
import Product from './pages/admin/product';

function App() {
  return (
    <BrowserRouter>
    <Routes>

    <Route exact path="/customerView" element={<Index/>} />
    <Route exact path="/" element={<Category/>} />
    <Route exact path="/subCategory/:id" element={<SubCategory/>} />
    <Route exact path="/product" element={<Product/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
