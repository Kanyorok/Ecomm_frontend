import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../../pages/Layout/MetaData';
import { resetPassword, clearErrors } from "../../redux/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    const { token } = useParams();
    const Token = token

    const dispatch = useDispatch();

    const { error, loading, success } = useSelector(state => state.forgotPassword);

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success('Password updated successfully')
            navigate('/signin')
        }

    }, [dispatch, toast, error, navigate, success])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(Token, formData))
    }

    return (
        <Fragment>
            <MetaData title={'Set New Password'} />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded">
                    <form onSubmit={submitHandler}>
                        <h1 className="text-2xl font-bold mb-4">New Password</h1>
                        <div className="mb-4">
                            <label htmlFor="password_field" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirm_password_field" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading ? true : false}>
                            Set Password
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewPassword;
