import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Product from '../Components/Product';
import NavBar from '../Components/NavBar';
import { useCategory } from '../middleware/Hooks';
import CategoryScroll from '../Components/CategoryScroll';
import ProductSkeleton from '../Skeletons/ProductSkeleton';
import AvatarSkeleton from '../Skeletons/AvatarSkeleton';
import ButtonSkeleton from '../Skeletons/ButtonSkeleton';

const CategoryProducts = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [catProducts, setCatProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useCategory();

    const fetchCat = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get( `/backend/product/category/${path}`);
            setCatProducts(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCat();
    }, [path]);

    return (
        <>
            <NavBar />
            { isLoading ? 
            (<div className='d-flex' style={{overflowX:'auto'}} > {[...Array(6)].map((_,index) => (<div className='col-md-1 col-3'><AvatarSkeleton /> <br /> <ButtonSkeleton /> </div>))}</div>) :
            <CategoryScroll />
          }
            <div className="row m-2">
                <div className="bar p-2 bg-body-secondary">
                    {isLoading
                        ? `Loading products...`
                        : `${catProducts?.length} Products in the category `}
                    <strong>{category?.find(c => c._id === path)?.name}</strong>
                </div>
                {isLoading ? (
                    <div className="bar d-flex flex-wrap">
                        {[...Array(6)].map((_, index) => (
                            <ProductSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="bar d-flex flex-wrap">
                        {catProducts?.map(product => (
                            <Product key={product.id} {...product} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default CategoryProducts;
