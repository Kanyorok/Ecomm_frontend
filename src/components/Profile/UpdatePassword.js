import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../../pages/Layout/MetaData';
import { updatePassword, clearErrors } from "../../redux/actions/userActions";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from "../../redux/constants/userConstants";
import { toast } from "react-toastify";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [oldPassword, setoldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')

    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector(state => state.user);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('Password updated successfully')

            navigate('/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, navigate, isUpdated])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('newPassword', newPassword);

        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Update User Password'} />
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                        <h1 className="text-2xl font-bold text-center mb-6">Update Password</h1>
                        <div className="mb-4">
                            <label htmlFor="old_password_field" className="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={oldPassword}
                                onChange={(e) => setoldPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="new_password_field" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={newPassword}
                                onChange={(e) => setnewPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4" disabled={loading ? true : false}>Update Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword
