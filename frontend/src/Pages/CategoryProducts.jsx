import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Product from '../Components/Product';
import NavBar from '../Components/NavBar';
import { useCategory } from '../middleware/Hooks';
import CategoryScroll from '../Components/CategoryScroll';

const CategoryProducts = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const[catProducts,setcatProducts]=useState();
    const[Isloading,setIsLoading]=useState(true)
    const[category,setcategory]=useCategory();
    const fetchCat=async()=>{
        try{
          const response= await axios.get(`http://localhost:5002/backend/product/category/${path}`)
          setcatProducts(response.data)
        }
        catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
       }
       useEffect(()=>{
        fetchCat();
       },[path])


  return (
     <>
     <NavBar/>
     <CategoryScroll />
     <div className="row m-2">
        <div className="bar p-2 bg-body-secondary">{catProducts?.length} Products with the  category <strong>{category?.find(c=>c._id==path)?.name}</strong></div>
        <div  className="bar d-flex flex-wrap ">
          {catProducts?.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div></>
  )
}

export default CategoryProducts
