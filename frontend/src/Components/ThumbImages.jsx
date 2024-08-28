import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const [open, setOpen] = useState(false);


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

  const getType = (base64Url) => {
    const matches = base64Url.match(/^data:(.*?);base64,/);
    return matches[1];
    }

  return (
    <div className=''>
      <div className='m-auto col-12 gap-3'  >
      <Slider {...settings} >
        {images.map((image, index) => (
            <center onClick={() => setOpen(true)} style={{aspectRatio:'4/3',objectFit:'contain'}}>
            { image.startsWith('data:video') ?
            <video controls style={{aspectRatio:'4/3'}} className='rounded'>
              <source src={image} type={getType(image)} />
            </video> :
            <img
            className='rounded-2'
              src={image}
              alt={`Thumbnail ${index}`}
            />
            }
          </center>
        ))}
      </Slider>

      </div>

      {open && 
      <div className='fullscreen col-12 h-100' >
        <h2 className="btn btn-outline-light m-3 " style={{float:'right',fontWeight:'bolder'}} onClick={() => setOpen(false)}><i className="fa-solid fa-x"> </i></h2>
        <center className='m-3 m-md-5 col-11 col-md-11' style={{height:'90vh',placeContent:'center'}}>
        <Slider {...settings} > 
          {images.map((src,index) => (
            <center key={index} style={{aspectRatio:'4/3',objectFit:'contain',overflow:'hidden'}}>
              { src.startsWith('data:video') ?
            <video controls>
              <source src={src} type={getType(src)} />
            </video> :
            <img
            className='m-auto'
              src={src}
              alt={""}
            />
            }
            </center>
          ))}
        </Slider>
        </center>

    </div>
    }
    </div>
  );
};

export default ThumbImages;
