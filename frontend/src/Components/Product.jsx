import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/Auth';
import { Link , useLocation} from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StarShow from './StarShow';
import axios from 'axios';

import WhatsAppLink from './WhatsappLink';

export default function Product(props) {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [averageRating, setAverageRating] = useState(0);
  const location = useLocation();
  
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`/backend/review/average-rating/${props._id}`);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error('Failed to fetch average rating', error);
      }
    };
    fetchAverageRating();
  }, [props._id]);

  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = storedCart.findIndex(item => item._id === props._id);

    if (itemIndex > -1) {
      storedCart[itemIndex].quantity += 1;
    } else {
      storedCart.push({ ...props, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(storedCart));
    setCart(storedCart);
    toast.success('Added to Cart successfully');
  };
  const productLink = `${window.location.origin}/product/${props._id}`;

  const message = `Check out this product: ${props.name}\nPrice: $${props.price}\n${productLink}`;
 const image = props?.profile?.[0]

  return (
    <div className="card container scale-up design d-flex flex-column my-3 m-md-2" style={{ maxWidth: '10rem'}}>
      <Toaster position="top-right" />
     <div className='p-0 m-0 col-12' style={{ objectFit:'contain',objectPosition:'center',overflow:'hidden'}}>
     <img 
        // src={pf + props?.profile[0]}
        src={image}
        className="card-img-top m-0 mt-1 rounded-2 p-0" 
        alt="Product" 
        style={{ width:'100%',aspectRatio:1.2/1}} 
      />
     </div>

      <div className="card-body p-0 m-0" style={{ fontSize:'12px'}}>

        <div className='d-flex flex-column m-1 p-0 gap-0'>
      <Link to={`/product/${props._id}`} className=" fw-bold text-dark" >
        <p className="card-title  p-0 m-0" style={{height:'45px'}}>
          {props.name?.substring(0, 20) + '..'}
        </p>
        <p className="card-text m-1 p-0">${props.price}</p>
        {auth?.user?.type === 'admin' && (
            (props?.seller?.name) ?
              (
              <div>
                <p className="card-text m-1 p-0"><strong>Seller:</strong> {props.seller.name}</p>
                <p className="card-text m-1 p-0"><strong>Contact:</strong> {props.seller.mobile}</p>
              </div>
              )
             : (
               <p className="card-text m-1">SellerId: {props.seller}</p>
            )
          )}
      </Link>

        <StarShow rating={averageRating} />
       
        </div>

      </div>

      <div className='d-flex align-items-center' >
        {(auth?.user?.type !== 'seller') && 
          <button type="button" className="btn btn-sm btn-success w-100 m-2" style={{height:'30px'}} onClick={addToCart} > to Cart </button>   
        }
        <span className='w-50 d-flex justify-content-center ' style={{height:'40px'}}>
                <WhatsAppLink phoneNumber={8520010807} message={message}  />
        </span>
        </div>
      
    </div>
  );
}
