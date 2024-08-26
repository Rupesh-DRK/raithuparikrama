import React, { useState } from 'react'
import Userpie from './Userpie'
import DashboardPanel from './DashboardPanel'
import NavBar from '../../Components/NavBar';
import Catpie from './Catpie';

const DashBoard = () => {
  const [component,setComponent]= useState(<Userpie/>);
  return (
  <>
  <NavBar />
    <div className='d-flex row'>
        <div className='col-12 col-md-3'>
          <DashboardPanel />
        </div>
        <div className='col-12 col-md-9 row'>
          <div className="col-12 col-md-5 m-1 ">
            <Userpie />
          </div>
          <div className="col-12 col-md-5 m-1 ">
          <Catpie />
          </div>
        </div>  
    </div>
  
  </>
  )
}

export default DashBoard
