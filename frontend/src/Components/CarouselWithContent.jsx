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
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${slide?.profile?.[0]})`, 
              backgroundPosition: 'center',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat", 
              height: '400px',
              width:'95%',
              position: 'relative' 
          
            }}
          >
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
              <Button as={Link} to={`/product/${slide._id}`} variant="outline-light">
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
