import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa fa-star"></i>);
    }

    if (halfStars === 1) {
      stars.push(<i key={stars.length} className="fa fa-star-half"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={stars.length} className="fa fa-star-o"></i>);
    }

    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
