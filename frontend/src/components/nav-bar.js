import React from "react";
import { Link } from 'react-router-dom';

import { BiCategory, BiCube } from 'react-icons/bi'; 
import { BsPeople } from 'react-icons/bs'; 





function Navbar() {



  return (


    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">

      <Link to='/' class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-5 d-none d-sm-inline mt-4">Admin</span>
      </Link>
      <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start mt-4" id="menu">
        <li class="nav-item">

          <Link to='/' class="nav-link align-middle px-0">
            <BiCategory size="1.5em" /> <span class="ms-1 d-none d-sm-inline">Category</span>
          </Link>
        </li>

        <li>

          <Link to='/product' class="nav-link px-0 align-middle">
            <BiCube size="1.5em" /> <span class="ms-1 d-none d-sm-inline">Product</span></Link>
        </li>

        <li>

          <Link to='/customerView' class="nav-link px-0 align-middle">
            <BsPeople size="1.5em" /> <span class="ms-1 d-none d-sm-inline">Customer View</span></Link>
        </li>
      </ul>
      <hr />

    </div>


  );


}


export default Navbar;


