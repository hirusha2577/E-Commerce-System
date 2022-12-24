import React, { useState, useEffect } from 'react';
import './category.css';
import swal from 'sweetalert';
import { reactBaseURL } from '../../config';
import { Link } from 'react-router-dom';

import Navbar from '../../components/nav-bar';
import FormInput from '../../components/FormInput';

import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdManageAccounts } from 'react-icons/md';

import { getAllCategories, addCategory, getSelectedCatagory, editCategoryData, deleteCategoryData } from '../../api/category.api';

function Category() {

    const [categoryData, setCategoryData] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoryName, setCategoryName] = useState(categoryData.name);
    const [states, setStatus] = useState(Boolean);

    useEffect(() => {
        getAllCategories().then((result) => {
            setCategory(result.data);
        });
    }, [])

    function categoryAdd() {
        if (categoryName === '') {
            swal("Name field is empty..");
        } else {
            addCategory({ name: categoryName }).then((result) => {
                if (result.message === "created") {
                    swal({
                        title: "Success!",
                        text: "New Category Add Successfully",
                        icon: 'success',
                        timer: 2000,
                        button: false,
                    });

                    setCategoryName('');

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

    function editCategory(id, status) {
        setStatus(status);
        getSelectedCatagory(id).then((result) => {
            setCategoryData(result.data);
        });
    }

    function categoryEdit() {
        swal({
            title: "Are you sure?",
            text: "Do you want to change category details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    editCategoryData(categoryData._id, { name: categoryName }).then((result) => {
                        if (result.message === "updated") {
                            swal({
                                title: "Success!",
                                text: "Category Update Successfully",
                                icon: 'success',
                                timer: 2000,
                                button: false,
                            });
                            setTimeout(() => {
                                window.location.replace(reactBaseURL + "/");
                            }, 2050)
                        } else {
                            swal({
                                title: "Error!",
                                text: "Category Update Unsuccessfully",
                                icon: 'error',
                                timer: 2000,
                                button: false
                            });
                        }
                    });
                }
            });

    }

    function deleteCategory(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
                if (willDelete) {
                    deleteCategoryData(id).then((result) => {
                        var categoryList = category.filter((e) => e._id !== result.data._id);
                        setCategory(categoryList);
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
        setCategoryName(data);
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
                            {states ? <>
                                <h4 class="form-title">Update Category</h4>
                            </>
                                :
                                <h4 class="form-title">Add Category</h4>
                            }
                            <div class="form-group">
                                <label for="exampleInputEmail1 ">Category name</label>
                                <FormInput value={categoryData.name} onSave={nameSetHandler} class="form-control mt-1" placeholder="Category name" />
                            </div>

                            {states ? <>
                                <button type="submit" class="btn btn-primary mt-4 mb-1" onClick={() => categoryEdit()}>Submit</button>
                            </>
                                :
                                <button type="submit" class="btn btn-primary mt-4 mb-1" onClick={() => categoryAdd()}>Submit</button>
                            }
                        </div>
                    </div>

                    <div class="card table-card shadow-sm p-4 mb-5 bg-white rounded">
                        <table class="table table-striped my-table">
                            <thead>
                                <tr>
                                    <th scope="col">Category ID</th>
                                    <th scope="col">Category Name</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.map((value, index) => {
                                    return <tr key={index}>
                                        <td>{value._id}</td>
                                        <td>{value.name}</td>
                                        <td class="d-flex justify-content-around" >
                                            <AiFillDelete class="delete-icon" size="1.5em" onClick={() => deleteCategory(value._id)} />
                                            <AiFillEdit class="edit-icon" size="1.5em" onClick={() => editCategory(value._id, true)} />
                                            <Link to={"/subCategory/" + value._id} class="manage-icon"><MdManageAccounts  size="1.5em"  /></Link></td>
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

export default Category;