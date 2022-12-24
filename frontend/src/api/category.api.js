import axios from 'axios';

// Config
import { baseURL } from '../config';

export const addCategory = async (details) => {
    const { data } = await axios.post(baseURL + '/category', details);
    return data;
}

export const getAllCategories = async () => {
    const { data } = await axios.get(baseURL + '/category');
    return data;
}

export const deleteCategoryData = async (id) => {
    const { data } = await axios.delete(baseURL + '/category/'+id);
    return data;
}

export const editCategoryData = async (id,details) => {
    const { data } = await axios.put(baseURL + '/category/'+id, details);
    return data;
}

export const getSelectedCatagory = async (id) => {
    const { data } = await axios.get(baseURL + '/category/'+id);
    return data;
}

