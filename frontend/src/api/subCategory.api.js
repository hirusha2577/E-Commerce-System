import axios from 'axios';

// Config
import { baseURL } from '../config';

export const addSubCategory = async (details) => {
    const { data } = await axios.post(baseURL + '/subCategory', details);
    return data;
}

export const getAllSubCategories = async () => {
    const { data } = await axios.get(baseURL + '/subCategory');
    return data;
}

export const deleteSubCategoryData = async (id) => {
    const { data } = await axios.delete(baseURL + '/subCategory/'+id);
    return data;
}

export const editSubCategoryData = async (id,details) => {
    const { data } = await axios.put(baseURL + '/subCategory/'+id, details);
    return data;
}

export const getSelectedSubCatagory = async (id) => {
    const { data } = await axios.get(baseURL + '/subCategory//'+id);
    return data;
}

export const getSubCategoryByCategoryId = async (id) => {
    const { data } = await axios.get(baseURL + '/subCategory/'+id);
    return data;
}

