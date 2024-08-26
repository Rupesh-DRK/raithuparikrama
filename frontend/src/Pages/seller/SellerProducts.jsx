import React, { useContext, useEffect, useState } from 'react';
import Panel from '../../Components/Panel';
import Product from '../../Components/Product';
import axios from 'axios';
import Ant from '../../Components/Ant';
import { useAuth } from '../../context/Auth';
import NavBar from '../../Components/NavBar';

const SellerProducts = () => {
    const [dat, setDat] = useState([]);
  const[auth,setAuth]=useAuth()

    const fetchSellerProducts = async () => {
        try {
            const response = await axios.post("http://localhost:5002/backend/product/sellerproducts", { sellerId: auth.user._id });
            setDat(response.data);
        } catch (error) {
            console.error("Error fetching seller's products:", error);
        }
    };

    useEffect(() => {
        fetchSellerProducts();
    }, []);

    return (
       <>
       <NavBar/>
        <div className="sellerProducts">
            <div className="row">
                <div className="col-md-3 col-10 mx-auto"><Panel /></div>
                <div className="col-md-8 d-flex flex-wrap col-10 mx-auto">
                    {dat.length > 0 ? (
                        dat.map((product) => (
                            <Ant key={product._id} {...product}/>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </div></>
    );
};

export default SellerProducts;
