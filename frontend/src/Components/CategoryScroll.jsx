import React, { useState } from 'react'
import { useCategory } from '../middleware/Hooks'
import { useNavigate } from 'react-router-dom';
import bomma from "../assets/farm.png"

const CategoryScroll = () => {
    const [category] = useCategory();
    const navigate = useNavigate();
    const handleCatClick = (cat) => {
      navigate(`/category/${cat._id}`);
  };

  return (
    <div className='d-flex' style={{ overflowX:'scroll', scrollbarWidth:'none'}}>
      {category?.map((cat,index )=> (
        <div key={index} className='d-block justify-content-center m-2'  onClick={()=> handleCatClick(cat)} >
         <div className="preview mx-auto border m-2" style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover' }}>
                      <img src={ (cat.img == "") ? bomma : cat.img}  style={{ width: '100%', height: '100%' }} />
          </div>
            <p className=' m-0 p-0' style={{fontSize:'12px', textAlign:'center'}}><b>{cat.name}</b> </p>
        </div>
      ))}
    </div>
  )
}
export default CategoryScroll
    