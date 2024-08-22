import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, updateOrder, clearErrors } from '../../redux/actions/orderActions';
import { UPDATE_ORDER_RESET } from '../../redux/constants/orderConstants';

const ProcessOrder = () => {
    const [status, setStatus] = useState('');

    const dispatch = useDispatch();
    const { loading, order = {} } = useSelector(state => state.orderDetails);
    const { shippingInfo, orderItems, paymentInfo, User, totalPrice, orderStatus } = order;
    const { error, isUpdated } = useSelector(state => state.order);
    const { id } = useParams();
    const orderId = id;

    useEffect(() => {
        dispatch(getOrderDetails(orderId));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('Order updated successfully');
            dispatch({ type: UPDATE_ORDER_RESET });
        }
    }, [dispatch, error, isUpdated, orderId]);

    const updateOrderHandler = (id) => {
        const formData = new FormData();
        formData.set('status', status);
        dispatch(updateOrder(id, formData));
    };

    const parsedShippingInfo = shippingInfo ? JSON.parse(shippingInfo) : {};
    const shippingDetails = parsedShippingInfo ? `${parsedShippingInfo.address}, ${parsedShippingInfo.city}, ${parsedShippingInfo.postalCode}, ${parsedShippingInfo.country}` : '';
    const parsedPaymentInfo = paymentInfo ? JSON.parse(paymentInfo) : {};
    const isPaid = parsedPaymentInfo && parsedPaymentInfo.status === 'success';
    const parsedOrderItems = orderItems ? JSON.parse(orderItems) : [];

    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order.id}`} />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>
                <div className="w-4/5">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="flex flex-wrap justify-around">
                                <div className="w-full lg:w-7/12 order-details">
                                    <h2 className="my-5 text-2xl">Order # {order.id}</h2>
                                    <h4 className="mb-4 text-lg">Shipping Info</h4>
                                    <p><b>Name:</b> {User && User.name}</p>
                                    <p><b>Phone:</b> {parsedShippingInfo && parsedShippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address:</b> {shippingDetails}</p>
                                    <p><b>Amount:</b> Ksh. {totalPrice}</p>
                                    <hr />
                                    <h4 className="my-4 text-lg">Payment</h4>
                                    <p className={isPaid ? "text-green-500" : "text-red-500"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>
                                    <h4 className="my-4 text-lg">PayStack ID</h4>
                                    <p><b>{parsedPaymentInfo && parsedPaymentInfo.reference}</b></p>
                                    <h4 className="my-4 text-lg">Order Status:</h4>
                                    <p className={orderStatus && orderStatus.includes('Delivered') ? "text-green-500" : "text-red-500"}><b>{orderStatus}</b></p>
                                    <h4 className="my-4 text-lg">Order Items:</h4>
                                    <hr />
                                    <div className="cart-item my-1">
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
                                    <hr />
                                </div>
                                <div className="w-full lg:w-1/4 mt-5">
                                    <h4 className="my-4 text-lg">Status</h4>
                                    <div className="mb-4">
                                        <select
                                            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                    <button
                                        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        onClick={() => updateOrderHandler(order.id)}
                                    >
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;
