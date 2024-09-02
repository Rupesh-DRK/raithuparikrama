import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      <div className='m-auto col-11 gap-3 my-3 my-md-0'  >
      <Slider {...settings} >
        {images.map((image, index) => (
            <div className='col-12' key={index} onClick={() => setOpen(true)} style={{objectFit:'contain'}}>
            { image.startsWith('data:video') ?
            <video controls style={{maxHeight:'100%',objectFit:'contain',aspectRatio:'4/3'}} className='rounded-3 m-0 p-0 col-12'  onClick={()=>{setOpen(true)}}>
              <source src={image} type={getType(image)} />
            </video> :
            <center>
              <div className='col-12 rounded' style={{maxHeight:'45vh',objectFit:'contain',aspectRatio:'4/3'}}>
              <img className='rounded-2'
            style={{objectPosition:'center',maxHeight:'100%',maxWidth:'auto'}}
              src={image}
              alt={`Thumbnail ${index}`}
            />
            </div>
            </center>
            }
          </div>
        ))}
      </Slider>
      </div>

      {open && (
          <div
            className='fullscreen col-12'
            style={{position: 'fixed',top: 0,left: 0,width: '100%',height: '100%',backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex',alignItems: 'center',justifyContent: 'center',zIndex: 9999 }} >
            <h2
            className="btn btn-outline-light"
            style={{position: 'absolute',top: '20px',right: '20px',fontWeight: 'bolder',cursor: 'pointer',zIndex: 10000 }}
            onClick={() => setOpen(false)}
            >
            <i className="fa-solid fa-x"></i>
            </h2>
            <div className='col-12 m-auto col-md-11'
            style={{ height: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',placeContent:'center'
            }}
          >
            <Slider {...settings} autoplay={false} style={{ width: '100%', maxHeight: '100%' }}>
              {images.map((src, index) => (
                <div
                  key={index}
                  style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                  }}
                >
                  {src.startsWith('data:video') ? (
                    <center>
                      <video
                      controls
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', aspectRatio: '4/3' 
                      }} className='rounded col-md-9 col-12' >
                      <source src={src} type={getType(src)} />
                    </video>
                    </center>
                  ) : (
                    <center>
                      <img
                      src={src}
                      alt=""
                      style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain', aspectRatio: '4/3'  }} 
                      className='rounded col-12 col-md-9' />
                    </center>
                  )}
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

    </div>
    )}
    </>
  );
};

export default ThumbImages;
