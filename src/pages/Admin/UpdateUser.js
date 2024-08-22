import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserDetails, clearErrors } from '../../redux/actions/userActions';
import { UPDATE_USER_RESET } from '../../redux/constants/userConstants';

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails);
    const { id } = useParams();

    const userId = id;

    useEffect(() => {
        if (user && user.id !== userId) {
            dispatch(getUserDetails(userId));
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('User updated successfully');
            navigate('/admin/users');
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, error, isUpdated, userId, navigate]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);

        dispatch(updateUser(user.id, formData));
    };

    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="flex">
                <div className="w-1/4">
                    <Sidebar />
                </div>
                <div className="w-3/4">
                    <div className="m-4">
                        <h1 className="text-2xl mb-5">Update User</h1>
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <div className="mb-4">
                                <label htmlFor="name_field" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="name"
                                    id="name_field"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email_field" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="role_field" className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    id="role_field"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    name='role'
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded" disabled={loading}>
                                {loading ? 'Updating...' : 'UPDATE'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;
