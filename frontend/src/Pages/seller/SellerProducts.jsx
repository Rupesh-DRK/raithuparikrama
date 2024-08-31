import React, { useEffect, useState } from 'react';
import Panel from '../../Components/Panel';
import Ant from '../../Components/Ant';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import NavBar from '../../Components/NavBar';
import ImageSkeleton from '../../Skeletons/ImageSkeleton';
import ButtonSkeleton from '../../Skeletons/ButtonSkeleton';

const SellerProducts = () => {
    const [dat, setDat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();

    const fetchSellerProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.post( "/backend/product/sellerproducts", { sellerId: auth.user._id });
            setDat(response.data);
        } catch (error) {
            console.error("Error fetching seller's products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellerProducts();
    }, []);

    return (
       <>
       <NavBar />
        <div className="sellerProducts">
            <div className=" d-md-flex">
                <div className="col-md-3 col-10 mx-auto">
                    <Panel />
                </div>
                <div className="d-flex flex-wrap col-12 p-0 col-md-8 mx-auto">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div className='col-6 col-md-3' key={index}>
                                <center>
                                    <ImageSkeleton />
                                    <ButtonSkeleton />
                                    <><ButtonSkeleton /><ButtonSkeleton /></>
                                </center>
                            </div>
                        ))
                    ) : (
                        dat.length > 0 ? (
                            dat.map((product) => (
                                <Ant key={product._id} {...product} />
                            ))
                        ) : (
                            'No Products Uploaded by YOU'
                        )
                    )}
                </div>
            </div>
        </div>
       </>
    );
};

export default SellerProducts;
