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
            href={`http://localhost:5002/backend/images/${image}`} // Link to the image URL
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              handleThumbnailClick(image, index); // Set current image and index
            }}
          >
            <img
              src={`http://localhost:5002/backend/images/${image}`}
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


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import StarShow from './StarShow';
// import { useLocation } from 'react-router-dom';
// import 'uikit/dist/css/uikit.min.css'; // Ensure UIkit CSS is included
// import 'uikit/dist/js/uikit.min.js'; // Ensure UIkit JS is included
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ThumbImages = ({ props }) => {
//   const [averageRating, setAverageRating] = useState(0);
//   const location = useLocation();
//   const path = location.pathname.split('/')[2];
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   };

//   const [currentImage, setCurrentImage] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(null);

//   const handleThumbnailClick = (image, index) => {
//     setCurrentImage(image);
//     setCurrentIndex(index);
//   };

//   useEffect(() => {
//     const fetchAverageRating = async () => {
//       try {
//         const response = await axios.get(`/backend/review/average-rating/${path}`);
//         setAverageRating(response.data.averageRating);
//       } catch (error) {
//         console.error('Failed to fetch average rating', error);
//       }
//     };
//     fetchAverageRating();
//   }, [path]);

//   return (
//     <div className='thumb'>
    
//       <Slider {...settings}>
//         {props?.profile?.map((image, index) => (
//           <a
//             key={index}
//             className="w-25 d-flex justify-content-center align-items-center m-auto"
//             href={`http://localhost:5002/backend/images/${image}`} // Link to the image URL
//             onClick={(e) => {
//               e.preventDefault(); // Prevent default anchor behavior
//               handleThumbnailClick(image, index); // Set current image and index
//             }}
//           >
//             <img
//               src={`http://localhost:5002/backend/images/${image}`}
//               alt={`Thumbnail ${index}`}
//               style={{ width: "100%", height: "auto", objectFit: "cover" }}
//             />
//           </a>
//         ))}
//       </Slider>
//       <div className="carousel-caption text-start d-md-block" style={{ color: 'white', padding: '20px', position: 'relative', top: '10px' }}>
//         <h3>{props.name}</h3>
//         <StarShow rating={averageRating} />
//         {props.description && <p className='w-50'>{(props.description).substring(0, 300) + "...."}</p>}
//       </div>
//     </div>
//   );
// };

// export default ThumbImages;

