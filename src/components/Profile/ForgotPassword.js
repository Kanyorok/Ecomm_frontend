import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../../pages/Layout/MetaData';
import { forgotPassword, clearErrors } from "../../redux/actions/userActions";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const dispatch = useDispatch();

    const { error, loading, message } = useSelector(state => state.forgotPassword);

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            toast.success(message)
        }

    }, [dispatch, toast, error, message])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))

    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded">
                    <form onSubmit={submitHandler}>
                        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
                        <div className="mb-4">
                            <label htmlFor="email_field" className="block text-sm font-medium text-gray-700">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading ? true : false}>
                            Send Email
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword;
