import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Collapse } from "antd";
import {  useCategory } from '../middleware/Hooks';
import { useAuth } from '../context/Auth';
import NavBar from "../Components/NavBar";
import img1 from "../assets/candle.jpg"
import Product from '../Components/Product';
import Review from './Review';
import ThumbImages from '../Components/ThumbImages';
import { Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import Thumbnails from '../Components/Thumbnails';
import WhatsAppLink from '../Components/WhatsappLink';


const { Panel } = Collapse;

const SingleProduct = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const[catproducts,setCatProducts]=useState()
  const[cat,setCat]=useState()
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
const[category,setCategory]=useCategory()
  
  
const addToCart = (post) => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = storedCart.findIndex(item => item._id === post._id);

  if (itemIndex > -1) {
    storedCart[itemIndex].quantity += 1;
  } else {
    storedCart.push({ ...post, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(storedCart));
  setCart(storedCart);
  toast.success("Added to Cart successfully");
};
  


  const fetchData = async () => {
    try {
      const productResponse = await axios.get(`http://localhost:5002/backend/product/${path}`);
      setPost(productResponse.data);
      setCat(productResponse.data.category);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
   const fetchCat=async()=>{
    try{
      const response= await axios.get(`http://localhost:5002/backend/product/category/${cat}`)
      setCatProducts(response.data)
    }
    catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
   }

  

  useEffect(() => {
    fetchData();
    fetchCat();
  }, [path ,auth.user,cat]);

  const productLink = `${window.location.origin}/product/${post._id}`;

  const message = `Check out this product: ${post.name}\nPrice: $${post.price}\nProduct's Link : ${productLink} `;


  return (
    <><NavBar/>
<div className="d-flex justify-content-start">
<button onClick={()=>window.history.go(-1)} style={{position:"absolute",top:"0px", zIndex:10}} className='btn btn-outline-dark'> <i className="fa-solid fa-arrow-left">  Back</i></button>

</div>
      <div className="singleProduct p-0 m-0 ">
        {isLoading ? (
          <div>Loading...</div>
        ) : 
        (
    <div className=" p-1 d-flex flex-column flex-md-row align-items-center m-2">
        <div className="col-md-6 col-12 m-2" >
            <ThumbImages props={post}/> 
            {/* <Thumbnails props={post} /> */}
            
        </div>
        <div className="content col-md-6 col-12 m-2">
          <div  className="m-2">
                <Collapse defaultActiveKey={3} style={{ width: "100%", marginTop: 8 }}>
                <Panel header="Product Details" key="3">
                <h6 className='d-flex'><div className="col-md-2 col-3">Name </div> <p className=' col-md-7 col-7' style={{color:'blue', fontWeight:'bold',textTransform:'capitalize'}}>: {post.name}</p>  </h6>
                  <h6 className='d-flex'><div className="col-md-2 col-3">Price  </div><h5 className='col-md-7 col-7'>: {(post.price)?.toLocaleString('en-IN', {
                   style: "currency",
                     currency: "INR"
                   })}</h5>
                  </h6>
                  <h6 className='d-flex'><div className="col-md-2 col-3">Category  </div> 
                              <h6 className='col-md-7 col-9'>
                                    : {category?.find(c=>c._id==post.category)?.name}
                              </h6>
                </h6>
                </Panel>
                  <Panel header="Description" key="1">{post.description}</Panel>
                  <Panel header="Reviews and Ratings" key="2">{(<Review productId={post._id} sellerId={post.seller} />) }</Panel>
                </Collapse>
              <div className="d-flex w-100 mt-2 gap-3" style={{height:'50px', objectFit:'contain'}}>
                  <Button className='w-100 align-self-center mx-2' style={{height:'40px'}}   onClick={()=>addToCart(post)} variant='dark'>Add To Cart</Button> 
               
                   <WhatsAppLink phoneNumber={8520010807} message={message}  />
                 
              </div>

          </div>
        </div>
    </div>
          
        )}

        
</div>

      <div className="row m-2">
        <div className="bar p-1 bg-body-secondary">Products with the same category</div>
        <div  className="bar d-flex flex-wrap m-1">
          {catproducts?.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;