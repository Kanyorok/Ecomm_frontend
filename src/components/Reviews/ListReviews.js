import React from 'react';
import './Review.css';

const ListReviews = ({ reviews }) => {
    return (
        <div className="reviews w-3/4">
            <h3 className="text-lg font-semibold">Other's Reviews:</h3>
            <hr className="border-gray-300 my-2" />
            {reviews && reviews.map(review => (
                <div key={review.id} className="review-card my-3 p-4 bg-gray-100 rounded-lg">
                    <div className="rating-outer">
          <div
            className="rating-inner"
            style={{ width: `${(review.rating / 5) * 100}%` }}
          ></div>
        </div>
                    <p className="review_user text-sm text-gray-600 mt-2">by {review.name}</p>
                    <p className="review_comment text-sm text-gray-700 mt-1">{review.comment}</p>

                    <hr className="border-gray-300 my-2" />
                </div>
            ))}
        </div>
    )
}

export default ListReviews;
