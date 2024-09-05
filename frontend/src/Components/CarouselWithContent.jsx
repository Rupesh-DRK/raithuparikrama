import React from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CarouselWithContent = ({ slides }) => {
  return (
    <Carousel controls={true}>
      {slides?.map((slide, index) => (
        <Carousel.Item key={index}>
          <div
            className="d-block col-12 m-auto rounded"
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${slide?.profile?.[0]})`, 
              backgroundPosition: 'center',
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat", 
              height: '400px',
              width:'95%',
              position: 'relative' 
          
            }}
          >
            <div className='p-2' style={{ 
                position: 'absolute', 
                bottom: '72%', 
                left: '3%', 
                color: 'white',
                transform: 'rotate(-35deg)',
                textAlign: "center",
                background:'white',
                borderRadius:'50%', color:'red'
              }}> 
              <p>Most <br /> Viewed <br />Products</p>
            </div>
            <div
              className="carousel-caption d-md-block"
              style={{ 
                position: 'absolute', 
                bottom: '5%', 
                left: '15%', 
                color: 'white', 
              }}
            >
              <h3 className='d-none d-md-block'>{slide.name}</h3>
              <Button as={Link} to={`/product/${slide._id}`} variant="outline-light" className='scale-up'>
                Details
              </Button>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselWithContent;
