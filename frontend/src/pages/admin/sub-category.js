import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import './sub-category.css';
import swal from 'sweetalert';
import { reactBaseURL } from '../../config';
import { Link } from 'react-router-dom';

import Navbar from '../../components/nav-bar';
import FormInput from '../../components/FormInput';

import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdManageAccounts } from 'react-icons/md';

import {  getSelectedCatagory } from '../../api/category.api';
import { addSubCategory, deleteSubCategoryData, getSubCategoryByCategoryId, getSelectedSubCatagory, editSubCategoryData } from '../../api/subCategory.api';
function SubCategory(props){

    const {id} = useParams();

    const [subCategoryData, setSubCategoryData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [subCategoryName, setSubCategoryName] = useState(subCategoryData.name);
    const [states, setStatus] = useState(Boolean);


    useEffect(() => {
        getSelectedCatagory(id).then((result) => {
            setCategoryData(result.data);
        });
    }, [])

    useEffect(() => {
        getSubCategoryByCategoryId(id).then((result) => {
            setSubCategory(result.data);
        });
    }, [])

    function subCategoryAdd() {
        if (subCategoryName === '') {
            swal("Name field is empty..");
        } else {
            addSubCategory({ categoryId:id, categoryName:categoryData.name ,name: subCategoryName }).then((result) => {
                if (result.message === "created") {
                    swal({
                        title: "Success!",
                        text: "New Category Add Successfully",
                        icon: 'success',
                        timer: 2000,
                        button: false,
                    });

                    setSubCategoryName('');

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
        }



    }

    function editSubCategory(id, status) {
        setStatus(status);
        getSelectedSubCatagory(id).then((result) => {
            setSubCategoryData(result.data);
        });
    }

    function subCategoryEdit() {
        swal({
            title: "Are you sure?",
            text: "Do you want to change sub-category details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    editSubCategoryData(subCategoryData._id, { name: subCategoryName }).then((result) => {
                        if (result.message === "updated") {
                            swal({
                                title: "Success!",
                                text: "Sub-Category Update Successfully",
                                icon: 'success',
                                timer: 2000,
                                button: false,
                            });
                            setTimeout(() => {
                                window.location.replace(reactBaseURL + "/subCategory/"+categoryData._id);
                            }, 2050)
                        } else {
                            swal({
                                title: "Error!",
                                text: "Sub-Category Update Unsuccessfully",
                                icon: 'error',
                                timer: 2000,
                                button: false
                            });
                        }
                    });
                }
            });

    }

    function deleteSubCategory(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
                if (willDelete) {
                    deleteSubCategoryData(id).then((result) => {
                        var subCategoryList = subCategory.filter((e) => e._id !== result.data._id);
                        setSubCategory(subCategoryList);
                    });

                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                        title: "Delete Successfully!",
                        buttons: false,
                        timer: 2000,
                    });
                }
            });
    }

    const nameSetHandler = (data) => {
        setSubCategoryName(data);
    }


    return(
        <div class="container-fluid main-container" >
        <div class="row flex-nowrap">
            <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <Navbar />
            </div>
            <div class="col py-3">
                <h3 class="sub-category-category-name">{categoryData.name} Category</h3>
                <div class="card from-card shadow-sm p-4 mb-5 bg-white rounded">
                    <div>
                        {states ? <>
                            <h4 class="form-title">Update Sub-Category</h4>
                        </>
                            :
                            <h4 class="form-title">Add Sub-Category</h4>
                        }
                        <div class="form-group">
                            <label for="exampleInputEmail1 ">Sub-category name</label>
                            <FormInput value={subCategoryData.name} onSave={nameSetHandler} class="form-control mt-1" placeholder="Category name" />
                        </div>

                        {states ? <>
                            <button type="submit" class="btn btn-primary mt-4 mb-1" onClick={() => subCategoryEdit()}>Submit</button>
                        </>
                            :
                            <button type="submit" class="btn btn-primary mt-4 mb-1" onClick={() => subCategoryAdd()}>Submit</button>
                        }
                    </div>
                </div>

                <div class="card table-card shadow-sm p-4 mb-5 bg-white rounded">
                    <table class="table table-striped my-table">
                        <thead>
                            <tr>
                                <th scope="col">Sub-Category ID</th>
                                <th scope="col">Sub-Category Name</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {subCategory.map((value, index) => {
                                return <tr key={index}>
                                    <td>{value._id}</td>
                                    <td>{value.name}</td>
                                    <td class="d-flex justify-content-around" >
                                        <AiFillDelete class="delete-icon" size="1.5em" onClick={() => deleteSubCategory(value._id)} />
                                        <AiFillEdit class="edit-icon" size="1.5em" onClick={() => editSubCategory(value._id, true)} />
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>






    );
}

export default SubCategory;