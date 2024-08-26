import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import "../App.scss"
import Bar from '../Components/Bar'
import CategoryScroll from '../Components/CategoryScroll'
import CarouselWithContent from '../Components/CarouselWithContent'
import axios from 'axios'
import ProductsGroupedByCategory from '../Components/ProductsGroupedByCategory'


export default function Index() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/backend/product/random?page=${page}&limit=5`);
      const newProducts = response.data.products;
      console.log(newProducts);
      setProducts(() => [ ...newProducts]);
      setHasMore(newProducts.length > 0);
     
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  };
  const randomItems = getRandomItems(products, 4);  
  return (
    <div className='index d-block'>
      <NavBar/>
      <CategoryScroll />
      <div className=''>
     { randomItems && <CarouselWithContent slides={randomItems}/>}
    </div>
    <ProductsGroupedByCategory />

    {/* <Bar/> */}
    
   
    </div>


  )
}
