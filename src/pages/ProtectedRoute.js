import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin }) => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    // Check if the user is authenticated
    if (!isAuthenticated) {
        return <Navigate to='/signin' />;
    }

    // Check if the user is an admin and has the correct role
    if (isAdmin && user.role !== "admin") {
        return <Navigate to='/' />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
