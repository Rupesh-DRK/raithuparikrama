import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Collapse } from "antd";
import { useCategory } from '../middleware/Hooks';
import { useAuth } from '../context/Auth';
import NavBar from "../Components/NavBar";
import Product from '../Components/Product';
import Review from './Review';
import ThumbImages from '../Components/ThumbImages';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import WhatsAppLink from '../Components/WhatsappLink';
import { useLocation } from 'react-router-dom';
import ProductSkeleton from '../Skeletons/ProductSkeleton';
import ImageSkeleton from '../Skeletons/ImageSkeleton';
import ButtonSkeleton from '../Skeletons/ButtonSkeleton';

const { Panel } = Collapse;

const SingleProduct = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [catproducts, setCatProducts] = useState([]);
  const [cat, setCat] = useState('');
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [category] = useCategory();
  const [prodLoading, setProductLoading] = useState(true);

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
      const productResponse = await axios.get(`/backend/product/${path}`);
      setPost(productResponse.data);
      setCat(productResponse.data.category);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchCat = async () => {
    try {
      setProductLoading(true);
      const response = await axios.get(`/backend/product/category/${cat}`);
      setCatProducts(response.data);
      setProductLoading(false);
    } catch (error) {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (cat) {
    fetchCat();
    }
  }, [path, auth.user, cat]);

  const productLink = `${window.location.origin}/product/${post._id}`;
  const message = `Check out this product: ${post.name}\nPrice: $${post.price}\nProduct's Link: ${productLink}`;

  return (
    <>
      <NavBar />
      <div className="container">
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline-dark"
          style={{ position: "absolute", top: "0px", zIndex: 10 }}
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        <section className="singleProduct my-3">
          {isLoading ? (
            <div className="row">
              <center className="col-md-6" style={{aspectRatio:'4/3',placeContent:'center'}}>
                <ImageSkeleton />
              </center>
              <div className="col-md-6 text-center" style={{aspectRatio:'4/3',placeContent:'center'}}>
                <ButtonSkeleton />
                <ButtonSkeleton />
                <ButtonSkeleton />
                <ButtonSkeleton />
                <ButtonSkeleton />
                <ButtonSkeleton />
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-6">
                <ThumbImages props={post} />
              </div>
              <div className="col-md-6">
                <Collapse defaultActiveKey={3} className="mt-2">
                  <Panel header="Product Details" key="3">
                    <dl className="row">
                      <dt className="col-sm-3">Name</dt>
                      <dd className="col-sm-9" style={{ color: 'blue', fontWeight: 'bold', textTransform: 'capitalize' }}>
                        {post.name}
                      </dd>
                      <dt className="col-sm-3">Price</dt>
                      <dd className="col-sm-9">
                        {(post.price)?.toLocaleString('en-IN', {
                          style: "currency",
                          currency: "INR"
                        })}
                      </dd>
                      <dt className="col-sm-3">Category</dt>
                      <dd className="col-sm-9">
                        {category?.find(c => c._id === post.category)?.name}
                      </dd>
                    </dl>
                  </Panel>
                  <Panel header="Description" key="1">
                    {post.description}
                  </Panel>
                  <Panel header="Reviews and Ratings" key="2">
                    <Review productId={post._id} sellerId={post.seller} />
                  </Panel>
                </Collapse>

                <div className="d-flex  w-100 mt-3 gap-3">
                  <Button
                    className="w-100"
                    style={{height:"max-content"}} 
                    onClick={() => addToCart(post)}
                    variant="dark"
                  >
                    Add To Cart
                  </Button>
                  <WhatsAppLink  phoneNumber={8520010807} message={message} />
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="related-products my-4">
          <div className="bar bg-body-secondary p-2">
            Products with the same category
          </div>
          <div className="flex-wrap d-flex">
            {prodLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ProductSkeleton key={index} className="col-md-3" />
              ))
            ) : (
              catproducts?.map(product => (
                <Product key={product._id} {...product} className="col-md-3" />
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleProduct;
