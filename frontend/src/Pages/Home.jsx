// src/components/LandingPage.js
import React from 'react';
import { Container, Button, Carousel,Card, Row, Col } from 'react-bootstrap';
import NavBar from "../Components/NavBar"
import StarShow from '../Components/StarShow';
import img1 from "../assets/bg.jpg"
import img2 from "../assets/bg3.png"
import Bar from '../Components/Bar';
import CategoryScroll from '../Components/CategoryScroll';
const Home = () => {
  const reviews = [
    {
      id: 1,
      avatar: 'https://via.placeholder.com/100',
      name: 'John Doe',
      rating: 5,
      comment: "Excellent tool, highly recommend!"
    },
    {
      id: 2,
      avatar: 'https://via.placeholder.com/100',
      name: 'Jane Smith',
      rating: 4,
      comment: "Very useful and well-made."
    },
    {
      id: 3,
      avatar: 'https://via.placeholder.com/100',
      name: 'Alex Johnson',
      rating: 5,
      comment: "Great quality and performance."
    },
  ];
  return (
    <div className='Home'>
    <NavBar />
    
    <div className="bg text-white text-center m-2 rounded-2">
    <Carousel interval={1500} >
      <Carousel.Item >
        <img
          className="d-block  w-100"
          src={img1}
          alt="First slide"
          style={{ maxHeight: "400px",objectFit:"contain" }} 
        />
        <Carousel.Caption>
          <Container className='shadd'>
            <h1 style={{fontSize:'3.4vw'}}>Welcome to Farming Tools</h1>
            <p className='d-none d-md-block' style={{fontSize:'1.2vw'}} >Your one-stop solution for the best farming equipment</p>
            <Button variant="outline-light" href="/index" className=' btn-sm btn-md'>Explore Tools</Button>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
          style={{ maxHeight: "400px",objectFit:"cover" }} 
        />
        <Carousel.Caption>
          <Container className='shadd'>
            <h1 style={{fontSize:'3.4vw'}}>Welcome to Farming Tools</h1>
            <p className='d-none d-md-block' style={{fontSize:'1.2vw'}} >Your one-stop solution for the best farming equipment</p>
            <Button variant="outline-light" href="#tools" className=' btn-sm btn-md'>Explore Tools</Button>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>
      {/* Add more Carousel.Items for additional images */}
    </Carousel>
    </div>
    {/* <ProductsGroupedByCategory /> */}
    <CategoryScroll />
    <Bar />

    <Container id="about" className="my-5">
      <h2>About Us</h2>
      <p>
        We provide high-quality farming tools that help farmers enhance their productivity and efficiency. Our tools are designed with the latest technology to meet the diverse needs of modern agriculture.
      </p>
    </Container>

    <Container className="my-5">
      <h2 className="text-center mb-4">Customer Reviews</h2>
      <Carousel interval={1000}>
        {reviews.map(review => (
          <Carousel.Item key={review.id}>
            <Card className="text-center">
              <Card.Body>
                <div className="avatar mb-3">
                  <img src={review.avatar} alt={`${review.name} avatar`} className="rounded-circle" />
                </div>
                <Card.Title>{review.name}</Card.Title>
                <StarShow rating={review.rating} />
                <Card.Text className="mt-3">{review.comment}</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  

    <Container id="contact" className="my-5">
      <h2>Contact Us</h2>
      <p>
        Have any questions? Feel free to reach out to us through our email: contact@farmingtools.com or call us at +123-456-7890.
      </p>
    </Container>

    <div className="bg-dark text-white text-center py-4">
    <Container className="my-5 text-center">
      <Button  variant="outline-info" href="/userreg" className="m-2 w-50">Register</Button>
      <Button variant="outline-warning" href="/sellerRegister" className="m-2 w-50">Become A Seller</Button>
    </Container>
      <Container>
        <p>&copy; 2024 Farming Tools. All rights reserved.</p>
      </Container>
      
    </div>
  </div>  );
};

export default Home;
