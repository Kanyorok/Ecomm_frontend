import React, { Fragment, useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from './Sidebar';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReviews, deleteReview, clearErrors } from '../../redux/actions/productAction';
import { DELETE_REVIEW_RESET } from '../../redux/constants/productConstants';

const ProductReviews = () => {

    const [productId, setProductId] = useState('');

    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.productReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review);

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (productId !== '') {
            dispatch(getProductReviews(productId));
        }

        if (isDeleted) {
            toast.success('Review deleted successfully');
            dispatch({ type: DELETE_REVIEW_RESET });
        }

    }, [dispatch, error, productId, isDeleted, deleteError]);

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId));
    };

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        };

        reviews.forEach(review => {
            data.rows.push({
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions: (
                    <button
                        className="text-white bg-red-600 hover:bg-red-700 py-1 px-2 ml-2 rounded"
                        onClick={() => deleteReviewHandler(review.id)}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                )
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title={'Product Reviews'} />
            <div className="flex flex-row ml-3">
                <div className="w-1/4">
                    <Sidebar />
                </div>

                <div className="w-3/4 ml-3">
                    <Fragment>
                        <div className="flex justify-center mt-5">
                            <div className="w-1/2">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field" className="block text-gray-700">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control w-full p-2 border border-gray-300 rounded mt-2"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-3"
                                    >
                                        SEARCH
                                    </button>
                                </form>
                            </div>
                        </div>

                        {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
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
                        ) : (
                            <p className="mt-5 text-center text-gray-600">No Reviews.</p>
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    );
};

export default ProductReviews;
