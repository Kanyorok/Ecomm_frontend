import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../../pages/Layout/Loader'
import MetaData from '../../pages/Layout/MetaData'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

  return (
    <Fragment>
        {loading ? <Loader/> :(
            <Fragment>
                <MetaData title={"Personal Profile Page"}/>
                <h2 className="mt-5 ml-5 text-2xl font-bold">My Profile</h2>
                <div className="flex justify-around mt-5 mb-5 flex-wrap user-info">
                    <div className="w-full md:w-1/4 flex flex-col items-center">
                        <figure className="w-32 h-32">
                            <img className="rounded-full w-full h-full object-cover" src="./images/default_avatar.png" alt="User Prof" />
                        </figure>
                        <Link to="/me/update" id="edit_profile" className="btn bg-blue-500 text-white w-full text-center py-2 mt-5 rounded hover:bg-blue-600">
                            Edit Profile
                        </Link>
                    </div>
            
                    <div className="w-full md:w-1/2">
                        <h4 className="text-lg font-semibold">Full Name</h4>
                        <p className="mb-4">{user.name}</p>
            
                        <h4 className="text-lg font-semibold">Email Address</h4>
                        <p className="mb-4">{user.email}</p>

                        <h4 className="text-lg font-semibold">Joined On</h4>
                        <p className="mb-4">{String(user.createdAt).substring(0, 10)}</p>
                        
                        {user.role !== 'admin' && (
                            <Link to="/orders/me" className="bg-red-500 text-white w-full text-center py-2 mt-5 rounded hover:bg-red-600">
                                My Orders
                            </Link>
                        )}
                        
                        <Link to="/password/update" className="bg-blue-500 text-white w-full text-center p-2 mt-3 rounded hover:bg-blue-600">
                            Change Password
                        </Link>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default Profile
