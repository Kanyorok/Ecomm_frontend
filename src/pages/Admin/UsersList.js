import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from './Sidebar';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, deleteUser, clearErrors } from '../../redux/actions/userActions';
import { DELETE_USER_RESET } from '../../redux/constants/userConstants';

const UsersList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('User deleted successfully');
            navigate('/admin/users');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, error, isDeleted])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,

                actions: <Fragment>
                    <Link to={`/admin/user/${user.id}`} className="bg-blue-500 text-white py-1 px-2 mr-2 rounded">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="bg-blue-500 text-white py-1 px-2 rounded" onClick={() => deleteUserHandler(user.id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Users'} />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>

                <div className="w-4/5 ml-3">
                    <Fragment>
                        <h1 className="my-5 text-2xl font-semibold">All Users</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                              data={setUsers()}
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
}

export default UsersList
