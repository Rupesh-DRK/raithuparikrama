// src/components/StarRating.js
import React from 'react';

const Star = ({ rating, onRatingChange }) => {
  const handleClick = (newRating) => {
    onRatingChange(newRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          style={{ cursor: 'pointer', fontSize:'2.5em',  color: star <= rating ? '#ffc107' : '#e4e5e9' }}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Star;
