import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import "../App.scss";
import CategoryScroll from '../Components/CategoryScroll';
import CarouselWithContent from '../Components/CarouselWithContent';
import ProductsGroupedByCategory from '../Components/ProductsGroupedByCategory';
import { useProducts } from '../middleware/Hooks';
import SkeletonImage from 'antd/es/skeleton/Image';

export default function Index() {
  const [products] = useProducts();
  const [loading, setLoading] = useState(true);
  const [randomItems, setRandomItems] = useState([]);

  const getRandomItems = (array, count) => {
    return array.slice(0, count);
  };

  useEffect(() => {
    if (products.length > 0) {
      setLoading(true);
      const items = getRandomItems(products, 4);
      setRandomItems(items);
      setLoading(false);
    }
  }, [products]);

  return (
    <div className='index d-block'>
      <NavBar />
      <div className='d-none d-md-block'><CategoryScroll /></div>
      <div className=''>
        {loading ? (
          <center>
            <div className='col-12 border rounded' style={{height:'40vh',placeContent:'center'}}>
              <SkeletonImage className='m-auto'/>
            </div>
          </center>
        ) : (
          randomItems && <CarouselWithContent slides={randomItems} />
        )}
      </div>
      <ProductsGroupedByCategory />
    </div>
  );
}
