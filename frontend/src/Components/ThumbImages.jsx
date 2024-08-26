import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarShow from './StarShow';
import { useLocation } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


const ThumbImages = ({ props }) => {
  const [averageRating, setAverageRating] = useState(0);
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const images = props?.profile || [];

  const settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:true,
  };

  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleThumbnailClick = (image, index) => {
    setCurrentImage(image);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`/backend/review/average-rating/${path}`);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error('Failed to fetch average rating', error);
      }
    };
    fetchAverageRating();
  }, [path]);

  const [open, setOpen] = useState(false);

  return (
    <div className=''>
      <div className='m-auto w-75 gap-3' onClick={() => setOpen(true)}>
      <Slider {...settings} >
        {props?.profile?.map((image, index) => (
          <a
            key={index}
            className=" d-flex justify-content-center align-items-center w-100"
            // href={`http://localhost:3000/backend/images/${image}`}
            href={image}
            onClick={(e) => {
              e.preventDefault(); 
              handleThumbnailClick(image, index); 
            }}
          >
            <img
            className='mt-2'
              src={image}
              alt={`Thumbnail ${index}`}
              style={{ width: "100%", height: "auto", objectFit: "contain"}}
            />
          </a>
        ))}
      </Slider>

      </div>


            {/* ratingsss */}
      {/* <div className="text-center mt-5 d-flex">
          <h4 className='w-50 m-auto p-1'>Ratings :<StarShow rating={averageRating} /></h4>
      </div> */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={props?.profile?.map((image) => ({
          src: image
        }))}
      />
    </div>
  );
};

export default ThumbImages;
