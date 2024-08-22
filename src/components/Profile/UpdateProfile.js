import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../../pages/Layout/MetaData';
import { updateProfile, loadUser, clearErrors } from "../../redux/actions/userActions";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('User updated successfully');
            navigate('/me');
            dispatch({ type: UPDATE_PROFILE_RESET });
            dispatch(loadUser());
        }
    }, [dispatch, error, navigate, isUpdated, user]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);

        dispatch(updateProfile(formData));
    };

    return (
        <Fragment>
            <MetaData title={'Update User Profile'} />
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md">
                    <form 
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
                        onSubmit={submitHandler} 
                        encType='multipart/form-data'
                    >
                        <h1 className="text-2xl font-bold mb-5">Update Profile</h1>

                        <div className="mb-4">
                            <label 
                                htmlFor="name_field" 
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Name
                            </label>
                            <input 
                                type="name" 
                                id="name_field" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label 
                                htmlFor="email_field" 
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email_field"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 cursor-not-allowed"
                                name='email'
                                value={email}
                                readOnly
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default UpdateProfile;
