import React, { useState, useEffect } from "react";
import './ProductInfo.css';
import { newReview, clearErrors } from "../../../redux/actions/productAction";
import { NEW_REVIEW_RESET } from "../../../redux/constants/productConstants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const RatingModal = ({prodId}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { error: reviewError, success } = useSelector(state => state.newReview)

  useEffect(() => {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.starValue = index + 1;
    });

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors())
    }

    if (success) {
      toast.success('Review posted successfully')
      dispatch({ type: NEW_REVIEW_RESET })
    }

  }, [isOpen, reviewError, dispatch, success]);

  const handleClick = (starValue) => {
    setRating(starValue);
  };

  const handleMouseOver = (starValue) => {
    setHoverRating(starValue);
  };

  const handleMouseOut = () => {
    setHoverRating(0);
  };

  const reviewHandler = () => {
    closeModal()
    const formData = new FormData();

    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('productId', prodId);

    dispatch(newReview(formData));
    closeModal()
}
  
  return (
    <div className="flex flex-col flex-start mt-2 mb-5">
      <div className="w-1/2">
        <button
          onClick={openModal}
          className="review_btn"
        >
          Submit A Review
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-lg">
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h5 className="text-lg font-semibold">Submit Review</h5>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>
              <div className="px-4 py-5">
                <ul className="flex space-x-2 mb-4 stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <li
                      key={star}
                      className={`star ${star <= (hoverRating || rating) ? 'orange' : ''}`}
                      onClick={() => handleClick(star)}
                      onMouseOver={() => handleMouseOver(star)}
                      onMouseOut={handleMouseOut}
                    >
                      <i className="fa fa-star"></i>
                    </li>
                  ))}
                </ul>
                <textarea
                  name="review"
                  id="review"
                  className="form-control mt-3 w-full border border-gray-300 rounded-md p-2"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  onClick={reviewHandler} 
                  className="review_btn"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingModal;
