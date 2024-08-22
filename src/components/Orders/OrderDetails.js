import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../../pages/Layout/MetaData';
import Loader from '../../pages/Layout/Loader';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from '../../redux/actions/orderActions';
import { getProductDetails } from '../../redux/actions/productAction';
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, order = {} } = useSelector(state => state.orderDetails);
    const { shippingInfo, orderItems, paymentInfo, User, totalPrice, orderStatus } = order;

    useEffect(() => {
        dispatch(getOrderDetails(id));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, id]);

    const parsedShippingInfo = shippingInfo ? JSON.parse(shippingInfo) : {};
    const shippingDetails = parsedShippingInfo ? `${parsedShippingInfo.address}, ${parsedShippingInfo.city}, ${parsedShippingInfo.postalCode}, ${parsedShippingInfo.country}` : '';

    const parsedPaymentInfo = paymentInfo ? JSON.parse(paymentInfo) : {};
    const isPaid = parsedPaymentInfo && parsedPaymentInfo.status === 'success';

    const parsedOrderItems = orderItems ? JSON.parse(orderItems) : [];

    return (
        <Fragment>
            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="flex flex-col lg:flex-row px-6 justify-between">
                        <div className="w-full lg:w-8/12 mt-5 mx-auto">
                            <h1 className="my-5 text-2xl font-bold">Order # {order.orderReceipt}</h1>

                            <h4 className="mb-4 text-xl font-semibold">Shipping Info</h4>
                            <p><strong>Name:</strong> {User && User.name}</p>
                            <p><strong>Phone:</strong> {parsedShippingInfo && parsedShippingInfo.phoneNo}</p>
                            <p className="mb-4"><strong>Address:</strong> {shippingDetails}</p>
                            <p><strong>Amount:</strong> Ksh. {totalPrice}</p>

                            <hr className="my-4" />

                            <h4 className="my-4 text-xl font-semibold">Payment</h4>
                            <p className={isPaid ? "text-green-600" : "text-red-600"}><strong>{isPaid ? "PAID" : "NOT PAID"}</strong></p>

                            <h4 className="my-4 text-xl font-semibold">Order Status:</h4>
                            <p className={orderStatus && String(orderStatus).includes('Delivered') ? "text-green-600" : "text-red-600"}><strong>{orderStatus}</strong></p>

                            <h4 className="my-4 text-xl font-semibold">Order Items:</h4>

                            <hr className="my-4" />
                            <div className="space-y-4">
                                {Array.isArray(parsedOrderItems) && parsedOrderItems.map(item => (
                                    <div key={item.product} className="flex flex-col lg:flex-row items-center my-5">
                                        <div className="w-1/4 lg:w-1/6 flex justify-center">
                                            <img src={item.image} alt={item.name} className="h-12 w-auto" />
                                        </div>

                                        <div className="w-1/2 lg:w-1/3">
                                            <Link to={`/order/product/${item.product}`} className="text-blue-600 hover:underline">{item.name}</Link>
                                        </div>

                                        <div className="w-1/4 lg:w-1/6 mt-4 lg:mt-0">
                                            <p className="text-lg">Ksh. {item.price}</p>
                                        </div>

                                        <div className="w-1/4 lg:w-1/6 mt-4 lg:mt-0">
                                            <p className="text-lg">{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr className="my-4" />
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default OrderDetails;
