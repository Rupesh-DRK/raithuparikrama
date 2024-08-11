import React from 'react'
import { NavLink } from 'react-router-dom'

const DashboardPanel = () => {
  return (
    <div className="panel">
    <div className="list-group m-2">
      <NavLink to="/admin/dashboard" className="list-group-item list-group-item-action">Pie Chart</NavLink>
      <NavLink to="/admin/approvals" className="list-group-item list-group-item-action">Approvals</NavLink>
      <NavLink to="/admin/add" className="list-group-item list-group-item-action">Upload Products</NavLink>
      <NavLink to="/admin/cate" className="list-group-item list-group-item-action"> Categories</NavLink>
      <NavLink to="/admin/catForm" className="list-group-item list-group-item-action"> Category Form</NavLink>
      <NavLink to="/admin/newForm" className="list-group-item list-group-item-action"> new Form</NavLink>
    </div>
  </div>
  )
}

export default DashboardPanel
