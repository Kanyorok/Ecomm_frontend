import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from './Sidebar';
import './Admin.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, deleteProduct, clearErrors } from '../../redux/actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstants';

const ProductsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success('Product deleted successfully');
            navigate('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted, navigate]);

    const setProducts = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', sort: 'asc' },
                { label: 'Name', field: 'name', sort: 'asc' },
                { label: 'Price', field: 'price', sort: 'asc' },
                { label: 'Stock', field: 'stock', sort: 'asc' },
                { label: 'Actions', field: 'actions' },
            ],
            rows: []
        };

        products.forEach(product => {
            data.rows.push({
                id: product.id,
                name: product.name,
                price: `Ksh. ${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <Link to={`/admin/product/${product.id}`} className="bg-blue-500 text-white py-1 px-2 rounded">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="bg-red-500 text-white py-1 px-2 ml-2 rounded"
                            onClick={() => deleteProductHandler(product.id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                )
            });
        });

        return data;
    };

    const deleteProductHandler = id => {
        dispatch(deleteProduct(id));
    };

    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>

                <div className="w-4/5 ml-3">
                    <Fragment>
                        <h1 className="my-5 text-2xl font-semibold">All Products</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setProducts()}
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

export default ProductsList;
