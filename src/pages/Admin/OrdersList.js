import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

import { useDispatch, useSelector } from 'react-redux';
import { allOrders, deleteOrder, clearErrors } from '../../redux/actions/orderActions';
import { DELETE_ORDER_RESET } from '../../redux/constants/orderConstants';

const OrdersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success('Order deleted successfully');
            navigate('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET });
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    const setOrders = () => {
        const data = {
            columns: [
                { label: 'Order ID', field: 'id', sort: 'asc' },
                { label: 'No of Items', field: 'numofItems', sort: 'asc' },
                { label: 'Amount', field: 'amount', sort: 'asc' },
                { label: 'Status', field: 'status', sort: 'asc' },
                { label: 'Actions', field: 'actions' },
            ],
            rows: []
        };

        orders.forEach(order => {
            // Safely check if orderItems is an array and has a length
            const numofItems = JSON.parse(order.orderItems);

            data.rows.push({
                id: order.id,
                numofItems: numofItems.length,
                amount: `Ksh. ${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p className="text-green-500">{order.orderStatus}</p>
                    : <p className="text-red-500">{order.orderStatus}</p>,
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order.id}`} className="bg-blue-500 text-white py-1 px-2 rounded">
                            <i className="fa fa-eye"></i>
                        </Link>
                        <button className="bg-red-500 text-white py-1 px-2 ml-2 rounded" onClick={() => deleteOrderHandler(order.id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                )
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>

                <div className="w-4/5 ml-3">
                    <Fragment>
                        <h1 className="my-5 text-2xl font-semibold">All Orders</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                              data={setOrders()}
                              className="custom-mdb-table p-3"
                              bordered
                              striped
                              hover
                              paginationLabel={['Previous', 'Next']}
                              entriesLabel="Show Entries"
                              infoLabel={['Showing', 'to', 'of', 'entries']}
                              searchLabel="Search"
                              pagesAmount={4}
                              responsive
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default OrdersList;
