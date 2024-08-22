import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from 'axios';
import { useSearchParams, useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from '../../redux/actions/orderActions';
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "../../redux/kamandoraSlice";
import { resetCart } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";

const VerifyPayment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = '/api/v1/createpayment';
  const { cartItems, shippingInfo } = useSelector(state => state.cart);
  const userInformation = useSelector((state) => state.kamandoraReducer.userInfo);
  const { error } = useSelector(state => state.newOrder)
  const dispatch = useDispatch();

  const order = {
    orderItems: cartItems,
    shippingInfo
  }

  if (userInformation){
    order.itemsPrice = userInformation[0].itemsPrice;
    order.shippingPrice = userInformation[0].shippingPrice;
    order.taxPrice = userInformation[0].taxPrice;
    order.totalPrice = userInformation[0].totalPrice;
  }

  useEffect(() => {
    
    if(error){
      toast.error(error)
      dispatch(clearErrors())
    }

    const verifyPayment = async () => {
      if (searchParams.has("reference")) {
        const reference = searchParams.get("reference");
        const requestUrl = `${url}?reference=${reference}`;
        try {
          const response = await axios.get(requestUrl);
          order.paymentInfo = response.data.data;
          order.paidAt = response.data.data.createdAt;
          order.orderReceipt = response.data.data.reference;
          dispatch(createOrder(order))
        } catch (error) {
          // Handle the error as needed
          console.error(error);
        }
      }
    };
    

    verifyPayment();
  }, []);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment Verification" />
      <div className="pb-10">
      <img className="my-5 block mx-auto" src="/images/order_success.png" alt="Order Success" width="200" height="200" />

      <h2 className="text-center text-xl font-semibold mt-4">Your Order has been placed successfully.</h2>

        <Link to="/orders/me">
          <button className="btn btn-block bg-[#8d8d75] hover:bg-gray-500 w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300 cursor-pointer">
            Go to Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyPayment;
