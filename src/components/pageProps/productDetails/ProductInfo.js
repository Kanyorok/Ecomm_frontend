import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Color from "../../pageProps/shopPage/shopBy/Color";
import { addItemToCart } from "../../../redux/actions/cartActions";
import "./ProductInfo.css";
import { toast } from "react-toastify";
import RatingModal from "./RatingModal";

const ProductInfo = ({ productInfo }) => {
  const highlightStyle = {
    color: "#d0121a", 
    fontWeight: "bold", 
  };
  const [quantity, setQuantity] = useState(1);
  const {user} = useSelector(state => state.auth);

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= productInfo.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const renderDescription = () => {
    if (!productInfo.description) {
      return null; // or handle accordingly if product.des is not defined
    }

    const description = productInfo.description
      .split(/:(.*?)-/)
      .map((part, index) => {
        return (
          <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
            {part}
          </span>
        );
      });

    return <>{description}</>;
  };
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItemToCart(productInfo.id, quantity));
    toast.success("item Added to Cart");
  };
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
      <p className="text-2xl font-semibold">
        Ksh. {productInfo.price}
        <span className="text-xl font-semibold line-through ml-2">
          Ksh. {productInfo.oldPrice}
        </span>
        <span className="text-xs ml-2 inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white">
          Save Ksh. {productInfo.oldPrice - productInfo.price}
        </span>
      </p>
      <hr />
      <p className="text-base text-gray-600">{renderDescription()}</p>

      <div className="flex items-center">
        <p className="text-sm mr-2"> Current Rating: {productInfo.ratings} </p>
        <hr />
        <div className="rating-outer">
          <div
            className="rating-inner"
            style={{ width: `${(productInfo.ratings / 5) * 100}%` }}
          ></div>
        </div>
        <span id="no_of_reviews">({productInfo.numOfReviews} Reviews)</span>
        <hr />
        <br />
        
      </div>
      { user ?
      <RatingModal prodId={productInfo.id} />
      : 
        <div className="bg-red-500 text-white p-4 mt-5">Login To Submit A Review</div>
      }
      <p>
        Status:{" "}
        <span
          id="stock_status"
          className={productInfo.stock > 0 ? "greenColor" : "orangeColor"}
        >
          {productInfo.stock > 0 ? `In Stock` : `Out of Stock`}
        </span>
      </p>

      <div>
        <p className="font-medium text-lg mr-3">
          <span className="font-normal">Quantity:</span>{" "}
        </p>

        <div className="stockCounter inline-flex items-center">
          <span
            className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={decreaseQty}
          >
            -
          </span>

          <input
            type="number"
            className="w-16 text-center border border-gray-300 rounded mx-2 count"
            value={quantity}
            readOnly
          />

          <span
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={increaseQty}
          >
            +
          </span>
        </div>
      </div>
      <Color />

      <button
        onClick={addToCart}
        className="w-full py-4 bg-[#af8965] rounded-md hover:bg-[#424027] duration-300 text-white text-lg font-titleFont"
        disabled={productInfo.stock === 0}
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Category:</span>
        {productInfo.category}
      </p>
    </div>
  );
};

export default ProductInfo;
