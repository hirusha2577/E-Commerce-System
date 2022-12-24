import React, { useState, useEffect } from 'react';
import './index.css';


import { getAllCategories } from '../api/category.api';
import { getSubCategoryByCategoryId } from '../api/subCategory.api';
import { getSelectedProducts, getAllProduct } from '../api/product.api';


function Index() {

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [product, setProduct] = useState([]);


  useEffect(() => {
    getAllCategories().then((result) => {
      setCategory(result.data);
    });
  }, [])


  const getSubCategory = (id) => {
    getSubCategoryByCategoryId(id).then((result) => {
      setSubCategory(result.data);
    });
  }

  useEffect(() => {
    getAllProduct().then((result) => {
      setProduct(result.data);
    });
  }, [])

 
  function getProduct( categoryId, subCategoryID ){
    getSelectedProducts(categoryId,subCategoryID).then((result) => {
      setProduct(result.data);
    });
  
  }



  return (

    <div class="container">
      <div class="row">
        <div class="col-md-3 mt-5 ">
          <div class="card category-nav">
            <h3>Categories</h3>
            <hr></hr>
            <div class="accordion accordion-flush" id="accordionFlushExample">
              {category.map((value, index) => {
                return <div class="accordion-item" key={index}>
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed category-btn" type="button" data-bs-toggle="collapse" data-bs-target={"#" + value.name} aria-expanded="false" aria-controls="flush-collapseOne" onClick={() => getSubCategory(value._id)}>
                      {value.name}
                    </button>
                  </h2>
                  <div id={value.name} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                      {subCategory.map((value2, index1) => {
                        return <ul class="listitem" key={index1}>
                          <button class="list-group-item sub-item-btn" onClick={()=>getProduct(value._id, value2._id)}> {value2.name}</button>
                        </ul>
                      })}
                    </div>
                  </div>
                </div>
              })}

            </div>
          </div>
        </div>

        <div class="col mt-5  ">
          <div class="row d-flex flex-wrap">
          {product.map((value, index) => {
                return<div class="col-md-3 product-container" key={index}>
              <div class="product-border">
                <div class="product-item">
                  <img src={value.image} class="product-img" alt="..." />
                  <div class="card-body">
                    <h5>{value.name} </h5>
                    <p class="card-text">${value.price} </p>
                  </div>
                </div>
                <button class="product-btn">ADD TO CART</button>
              </div>
            </div>
          })}


          </div>
        </div>

      </div>
    </div>
  );
}

export default Index;
