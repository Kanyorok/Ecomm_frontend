import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../../pages/Layout/MetaData';
import Loader from '../../pages/Layout/Loader';
import { toast } from 'react-toastify';
import './Order.css';

import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../redux/actions/orderActions';

const Orders = () => {

    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, toast, error]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        };

        orders.forEach(order => {
            const orderItems = JSON.parse(order.orderItems);
            data.rows.push({
                id: order.orderReceipt,
                numOfItems: orderItems.length,
                amount: `Ksh. ${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p className="text-green-500">{order.orderStatus}</p>
                    : <p className="text-red-500">{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order.id}`} className="bg-[transparent] text-black px-4 py-2 rounded hover:bg-blue-600">
                        <i className="fa fa-eye"></i>
                    </Link>
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title={'My Orders'} />

            <h1 className="text-2xl font-bold my-5">My Orders</h1>

            {loading ? <Loader /> : (
                <MDBDataTable
                    data={setOrders()}
                    className="custom-mdb-table p-3"
                    bordered
                    striped
                    hover
                    searching={true}
                    paginationLabel={['Previous', 'Next']}
                    entriesLabel="Show Entries"
                    infoLabel={['Showing', 'to', 'of', 'entries']}
                    searchLabel="Search"
                    pagesAmount={4}
                    responsive
                />
            )}
        </Fragment>
    );
};

export default Orders;
