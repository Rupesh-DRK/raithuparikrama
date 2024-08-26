import React from 'react'
import {NavLink} from "react-router-dom"

const Panel = () => {
  return (
    <div className="panel">
  <div className="list-group m-2">
    <NavLink to="/seller/Products" className="list-group-item list-group-item-action">My Products</NavLink>
    <NavLink to="/seller/add"  className="list-group-item list-group-item-action ">
      Add Product
    </NavLink>
    <NavLink to="/seller/CategoryPage" className="list-group-item list-group-item-action">Categories</NavLink>


  </div>
</div>

  )
}

export default Panel
