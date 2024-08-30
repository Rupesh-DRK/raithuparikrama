import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";

import { Skeleton } from 'antd';


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
    autoplaySpeed: 3000,
    arrows:true,
  };
  const [open, setOpen] = useState(false);
  const [isLoading,setLoading] = useState(true);
  

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`/backend/review/average-rating/${path}`);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error('Failed to fetch average rating', error);
      }
    };
    if (props.profile && props.profile.length > 0) {
      setLoading(false);
    }
    fetchAverageRating();
  }, [path,props.profile]);

  const getType = (base64Url) => {
    const matches = base64Url.match(/^data:(.*?);base64,/);
    return matches[1];
    }
    


  return (
  <>
    { isLoading ?  (
      <div className='col-12' >
      <center >
          <Skeleton.Image active={true} />
      </center>
     </div>
    ) :
    (
    <div className='' >
      <div className='m-auto col-12 gap-3'  >
      <Slider {...settings} >
        {images.map((image, index) => (
            <center onClick={() => setOpen(true)} >
            { image.startsWith('data:video') ?
            <video controls style={{maxHeight:'45vh',objectFit:'contain',aspectRatio:'4/3'}} className='rounded-3 m-0 p-0 col-12'  onClick={()=>{setOpen(true)}}>
              <source src={image} type={getType(image)} />
            </video> :
            <div className='col-12 rounded' style={{maxHeight:'45vh',objectFit:'contain',aspectRatio:'4/3'}}>
              <img
            className='rounded-2'
            style={{objectPosition:'center',maxHeight:'100%',maxWidth:'100%'}}
              src={image}
              alt={`Thumbnail ${index}`}
            />
            </div>
            }
          </center>
        ))}
      </Slider>

      </div>

      {open && 
      <div className='fullscreen col-12 h-100' >
        <h2 className="btn btn-outline-light m-3 " style={{float:'right',fontWeight:'bolder'}} onClick={() => setOpen(false)}><i className="fa-solid fa-x"> </i></h2>
        <center className='m-3 m-md-5 col-11 col-md-11' style={{height:'90vh',placeContent:'center'}}>
        <Slider {...settings} autoplay={false}> 
          {images.map((src,index) => (
            <center key={index} style={{aspectRatio:'4/3'}}>
              { src.startsWith('data:video') ?
            <video controls style={{ aspectRatio: '4/3'}} className='rounded'>
              <source src={src} type={getType(src)} />
            </video> :
            <img
            className='m-auto'
            style={{placeContent:'center',objectPosition:'center'}}
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
    )}
    </>
  );
};

export default ThumbImages;
