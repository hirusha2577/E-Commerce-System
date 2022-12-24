import React, { useState, useEffect } from 'react';
import './category.css';
import swal from 'sweetalert';
import { reactBaseURL } from '../../config';
import { Link } from 'react-router-dom';
import Select from 'react-select'

import Navbar from '../../components/nav-bar';
import FormInput from '../../components/FormInput';

import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdManageAccounts } from 'react-icons/md';

import { addProduct } from '../../api/product.api';
import { getAllSubCategories } from '../../api/subCategory.api';

function Product() {

    const [subCategoryList, setSubCategoryList] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [categoryData, setCategoryData] = useState([]);

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        getAllSubCategories().then((result) => {
            var list = result.data.map((data) => {
                return { value: [data.categoryId, data._id] , label: data.categoryName + " / " + data.name };
            })
            setSubCategoryList(list);
        });
    }, [])

    function productAdd() {
        // if (name === '' && description === '' && price === '' ) {
        //     swal("Enter the item details to proceed");
        // } else if (name === '') {
        //     swal("Enter the name");
        // } else if (description == "") {
        //     swal("Please select a description");
        // } else if (price === '') {
        //     swal("Please select a price"); 
        // } else if (selectedCategories.length>0) {
        //     swal("Please select image"); 
        // } else {

        let categoryArray = [];
        for (let i = 0; i < selectedCategories.length; i++) {
            categoryArray[i]=selectedCategories[i].value[0];
        }

        let subCategoryArray = [];
        for (let i = 0; i < selectedCategories.length; i++) {
            subCategoryArray[i]=selectedCategories[i].value[1];
        }

        const data = new FormData();
        data.append('categoryId', categoryArray);
        data.append('subCategoryId', subCategoryArray);
        data.append('name', name);
        data.append('description', description);
        data.append('price', price);
        data.append('image', image);

       
        addProduct(data).then((result) => {
            if (result.message === "created") {
                swal({
                    title: "Success!",
                    text: "New Category Add Successfully",
                    icon: 'success',
                    timer: 2000,
                    button: false,
                });

                setTimeout(() => {
                    window.location.reload(true);
                }, 2050)

            } else {
                swal({
                    title: "Error!",
                    text: "New Category Add Unsuccessfully",
                    icon: 'error',
                    timer: 2000,
                    button: false
                });
            }
        });


        

        // }



    }




    return (

        <div class="container-fluid main-container" >
            <div class="row flex-nowrap">
                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <Navbar />
                </div>
                <div class="col py-3">
                    <div class="card from-card shadow-sm p-4 mb-5 bg-white rounded">
                        <div>
                                <h4 class="form-title">Add Product</h4>
                            <div class="form-group">
                                <label for="exampleInputEmail1 ">Product name</label>
                                <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div class="form-group mt-2">
                                <label for="exampleInputEmail1 ">Product description</label>
                                <input type="text" class="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>
                            <div class="form-group mt-2">
                                <label for="exampleInputEmail1 ">Product price</label>
                                <input type="text" class="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </div>
                            <div class="form-group mt-2">
                                <label for="exampleInputEmail1 ">Select Category</label>
                                <Select class="form-control mt-1" isMulti options={subCategoryList} onChange={setSelectedCategories} />
                            </div>
                            <div class="form-group mt-4">
                                <label for="exampleFormControlFile1">Product image</label>
                                <input type="file" class="form-control-file"  id="formFile"onChange={e => setImage(e.target.files[0])}/>
                            </div>
                
                                <button type="submit" class="btn btn-primary mt-4 mb-1" onClick={() => productAdd()}>Submit</button>
                          
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>








    );
}

export default Product;