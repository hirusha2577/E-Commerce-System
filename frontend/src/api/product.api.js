import axios from 'axios';

// Config
import { baseURL } from '../config';

export const addProduct = async (details) => {
    const { data } = await axios.post(baseURL + '/product', details);
    return data;
}

export const getAllProduct = async () => {
    const { data } = await axios.get(baseURL + '/product');
    return data;
}

export const getSelectedProducts = async (categoryId,subCategoryId) => {
    const { data } = await axios.get(baseURL + '/product//'+categoryId+'/'+subCategoryId);
    return data;
}




