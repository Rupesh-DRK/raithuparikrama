import React, { useState, useEffect } from 'react';
import { useCategory } from '../middleware/Hooks';
import { useNavigate } from 'react-router-dom';
import bomma from "../assets/farm.png";
import AvatarSkeleton from '../Skeletons/AvatarSkeleton'; // Assume this skeleton exists
import ButtonSkeleton from '../Skeletons/ButtonSkeleton'; // Assume this skeleton exists

const CategoryScroll = () => {
    const [category, setCategory] = useCategory();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (category && category.length > 0) {
            setIsLoading(false);
        }
    }, [category]);

    const handleCatClick = (cat) => {
        navigate(`/category/${cat._id}`);
    };

    return (
        <div className='d-flex' style={{ overflowX: 'scroll', scrollbarWidth: 'none' }}>
            {isLoading ? (
                <div className='d-flex col-12 gap-2 m-0 mt-2 p-0' style={{overflowX:'auto'}}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className='col-3 col-md-1 p-0 m-1' >
                            <center><AvatarSkeleton /> 
                            <br />
                            <ButtonSkeleton /></center>
                        </div>
                    ))}
                </div>
            ) : ( 
                category?.map((cat, index) => (
                    <div key={index} className='d-block justify-content-center m-2' onClick={() => handleCatClick(cat)}>
                        <div className="preview mx-auto border m-2" style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover' }}>
                            <img src={(cat.img === "") ? bomma : cat.img} style={{ width: '100%', height: '100%' }} alt={cat.name} />
                        </div>
                        <p className='m-0 p-0' style={{ fontSize: '12px', textAlign: 'center' }}><b>{cat.name}</b></p>
                    </div>
                ))
            )}
        </div>
    );
};

export default CategoryScroll;
