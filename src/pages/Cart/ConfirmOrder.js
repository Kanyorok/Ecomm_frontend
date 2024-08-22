import React, { Fragment } from "react";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { Link } from "react-router-dom";
import "./Cart.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  //Calculate the tax and total price of the products in Cart
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 20000 ? 0 : 5.1;
  const taxPrice = Number((0.0 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);
  const proceedToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <Fragment>
      <MetaData title={`Confirm Order`} />
      <CheckoutSteps shipping confirmOrder />

      <div className="flex justify-between">
        <div className="w-full lg:w-8/12 mt-5 mb-5 mx-3 order-confirm">
          <h4 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">Shipping Info</h4>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>
          {cartItems.map((item) => (
            <Fragment key={item.product}>
              <hr />
              <div className="cart-item my-1">
                <div className="flex">
                  <div className="w-1/4 lg:w-1/12">
                    <img src={item.image} alt="Laptop" className="h-12 w-16" />
                  </div>

                  <div className="w-1/2 lg:w-6/12">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="w-1/4 lg:w-4/12 mt-4 lg:mt-0">
                    <p>
                      {item.quantity} x Ksh. {item.price} ={" "}
                      <b>Ksh. {(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="w-full lg:w-3/12 my-4">
          <div
            id="order_summary"
            className="p-4 border border-gray-300 rounded"
          >
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">
                Ksh. {itemsPrice.toFixed(2)}
              </span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">Ksh. {shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">Ksh. {taxPrice}</span>
            </p>
            <hr />
            <p>
              Total:{" "}
              <span className="order-summary-values">Ksh. {totalPrice}</span>
            </p>
            <hr />
            <button
              id="checkout_btn"
              className="btn btn-block bg-[#8d8d75] hover:bg-gray-500 w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300 cursor-pointer"
              onClick={proceedToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
