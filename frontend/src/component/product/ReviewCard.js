import React from 'react';
import ReactStars from 'react-rating-stars-component';
import avatar from '../../images/avatar.png';
const ReviewCard = ({ review }) => {
  return (
    <div className="inline-block min-w-[300px] max-w-[350px] p-3 rounded-md shadow-lg flex items-center flex-col">
      <img src={avatar} alt="User" className="w-16 rounded-full " />
      <p className="font-semibold">{review.name}</p>
      <div>
        <ReactStars
          edit={false}
          color="rgba(20,20,20,0.5)"
          activeColor="tomato"
          size={window.innerWidth < 600 ? 20 : 25}
          value={review.rating}
          isHalf={true}
        />
      </div>
      <span className="text-sm">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
