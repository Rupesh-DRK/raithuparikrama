import React, { useEffect, useState } from 'react';
import { useCategory } from '../middleware/Hooks';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Product from './Product';

const ProductsGroupedByCategory = () => {
  const [categories, setCategory] = useCategory();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const product = await axios.get('/backend/product/getProducts');
      setProducts(product.data);
    //   console.log(product.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
  { categories.map((cat, index) => (
      <>

    { products.filter(prod => prod.category === cat._id).length > 0 && (

     <div key={index} className='border rounded m-2 p-2'>
    <div className='d-flex justify-content-between m-1 px-2 bg-primary align-items-center rounded'>
    <h2 className=' px-2'>{cat.name}</h2>
    <button className='btn  btn-outline-light'  onClick={()=> { navigate(`/category/${cat._id}`);}}>View More</button>
    </div>
    <div className='d-flex flex-wrap flex-md-nowrap gap-3 overflow-auto'> 

    {products.filter(prod => prod.category === cat._id).map((product, index) => (
      <>
      {index < 8 && (
        <div key={index} className='m-1'>
        <Product props={product.id} {...product} /> 
       </div>
      )
      }
      </>
    ))}
    <button className='btn d-none d-md-flex align-self-center ms-auto border design rounded-4 m-1 scale-up' style={{width:'120px'}}  onClick={()=> { navigate(`/category/${cat._id}`);}}> View All</button>
    </div>
  </div>
) }
  </>
  
))}

      
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default ProductsGroupedByCategory;
