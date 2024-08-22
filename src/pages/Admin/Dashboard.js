import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from './Sidebar';

import { useDispatch, useSelector } from 'react-redux';

import { getAdminProducts } from '../../redux/actions/productAction';
import { allOrders } from '../../redux/actions/orderActions';
import { allUsers } from '../../redux/actions/userActions';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products);
    const { users } = useSelector(state => state.allUsers);
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders);

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(allOrders());
        dispatch(allUsers());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/5">
                    <Sidebar />
                </div>

                <div className="w-full md:w-4/5 p-4">
                    <h1 className="text-2xl font-bold my-4">Dashboard</h1>

                    {loading ? (
                        <Loader />
                    ) : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full xl:w-full px-4 mb-4">
                                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                                        <div className="text-center text-lg font-bold">
                                            Total Amount<br /> 
                                            <b>Ksh. {totalAmount && totalAmount.toFixed(2)}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full xl:w-1/4 px-4 mb-4">
                                    <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
                                        <div className="text-center text-lg font-bold">
                                            Products<br /> 
                                            <b>{products && products.length}</b>
                                        </div>
                                        <Link className="block mt-2 text-white hover:text-gray-200" to="/admin/products">
                                            <span>View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-full xl:w-1/4 px-4 mb-4">
                                    <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
                                        <div className="text-center text-lg font-bold">
                                            Orders<br /> 
                                            <b>{orders && orders.length}</b>
                                        </div>
                                        <Link className="block mt-2 text-white hover:text-gray-200" to="/admin/orders">
                                            <span>View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-full xl:w-1/4 px-4 mb-4">
                                    <div className="bg-blue-400 text-white p-4 rounded-lg shadow-lg">
                                        <div className="text-center text-lg font-bold">
                                            Users<br /> 
                                            <b>{users && users.length}</b>
                                        </div>
                                        <Link className="block mt-2 text-white hover:text-gray-200" to="/admin/users">
                                            <span>View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-full xl:w-1/4 px-4 mb-4">
                                    <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
                                        <div className="text-center text-lg font-bold">
                                            Out of Stock<br /> 
                                            <b>{outOfStock}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
