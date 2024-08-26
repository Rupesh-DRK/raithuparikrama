// src/components/StarRating.js
import React from 'react';

const StarShow = ({ rating }) => {

  return (
    <div > 
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          style={{ padding:0, margin:0, cursor: 'pointer', fontSize:'1.5em',  color: star <= rating ? '#ffc107' : '#e4e5e9' }}
       
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarShow;
