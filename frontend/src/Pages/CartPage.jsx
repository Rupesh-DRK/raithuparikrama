import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/Auth';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../assets/candle.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import WhatsAppLink from '../Components/WhatsappLink';
import NavBar from '../Components/NavBar';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [Ctoken, setCtoken] = useState("");
  const [instance, setInstance] = useState("");
  const [load, setLoad] = useState(false);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach(item => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString('en-US', {
        style: "currency",
        currency: "INR"
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuantity = (pid, newQuantity) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      if (index > -1 && newQuantity >= 1 && newQuantity <= myCart[index].quantityAvailable) {
        myCart[index].quantity = newQuantity;
        setCart(myCart);
        localStorage.setItem('cart', JSON.stringify(myCart));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/backend/product/payment/token");
      setCtoken(data?.clientToken);
     } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    getToken();
  }, [auth?.token]);

 
   const messages = () =>{ 
    return cart.map((item,index)=>{
            return ` Name : ${item.name} \n Price : ${item.price} \n Product url : ${'http://localhost:3000/product/'+item._id} \n`
   }).join(' ')
};

  return (
    <> 
    <NavBar />
    <div className="container p-0 ">
      
      <ToastContainer />
      <div className="row ">
        <div className="text-center">
          <h2 className="col-12 col-md-12">Hello <strong>{auth?.user.username}</strong></h2>
          <h4>{cart?.length > 0 ? `You have ${cart.length} items in your cart${auth?.token ? "" : " - please login to checkout"}` : "Your cart is empty"}</h4>
        </div>
      </div>

      <div className="row d-md-flex">
        <div className="col-12 flex-no-wrap d-md-flex p-0">
          {cart?.map(p => (
            <div className=" card flex-row m-1 flex-md-column col-md-3 col-lg-2 m-2 scale-up design" key={p._id}>
              <div className="col-4 col-md-12 p-0 mt-1">
                <img className='d-flex align-self-center' src={p.profile ?  `/backend/images/${p?.profile?.[0]}` : img1} width={200} alt="img" />
              </div>
              <div className="col-8 col-md-12 p-0 gap-0 text-md-center">
              <h4 className='m-1'><Link to={`/product/${p._id}`} >{(p.name).substring(0, 14) + "...."}</Link></h4>
                <p className='p-0 m-1'>{(p.description).substring(0, 30) + "...."}</p>
                <h5 className='p-0 m-1'>Price: {p.price}</h5>
                <div className="d-flex align-items-center justify-content-md-center">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(p._id, p.quantity - 1)} disabled={p.quantity <= 1}>-</button>
                  <span className="mx-2">{p.quantity}</span>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(p._id, p.quantity + 1)} disabled={p.quantity >= p.quantityAvailable}>+</button>
                </div>
                <button className="btn btn-danger btn-sm m-2" onClick={() => removeCartItem(p._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex flex-md-column col-12 col-md-12 align-items-center  mt-4">
          
          <div className=' col-6 col-md-3 text-center d-md-flex justify-content-center  align-items-center'><h4 className=''>Total : </h4> <h1 className='text-center scale-up'>{totalPrice()}</h1></div>
          <div className="scale-up col-6 col-md-3 text-center flex-column m-0 p-0 d-md-flex flex-md-row justify-content-center border">
            <p className='text-center p-0 my-auto'>Whatsapp to Order</p>
            <div className='col-8 col-md-3 mx-auto m-md-0 '>
             <WhatsAppLink phoneNumber={8520010807} message={messages()} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CartPage;
