import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Thumbnails = ({ props }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleThumbnailClick = (image, index) => {
    setCurrentImage(image);
    setCurrentIndex(index);
  };

 

  return (
    <div>
      <h2>Image Carousel for product thumbnails...</h2>
      <Slider {...settings}>
        {props?.profile?.map((image, index) => (
          <a
            key={index}
            className="w-25 d-flex justify-content-center align-items-center m-auto"
            href={ `/backend/images/${image}`} // Link to the image URL
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              handleThumbnailClick(image, index); // Set current image and index
            }}
          >
            <img
              src={ `/backend/images/${image}`}
              alt={`Thumbnail ${index}`}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default Thumbnails;


