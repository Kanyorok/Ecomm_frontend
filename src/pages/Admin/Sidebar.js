import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isSubmenuOpen, setSubmenuOpen] = useState(false);

    const toggleSubmenu = () => {
        setSubmenuOpen(!isSubmenuOpen);
    };

    return (
        <div className="w-64 h-full bg-gray-800 text-white">
            <nav className="p-4">
                <ul className="space-y-4">
                    <li>
                        <Link to="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                            <i className="fa fa-tachometer"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={toggleSubmenu} className="flex items-center space-x-2 text-gray-300 hover:text-white">
                            <i className="fa fa-product-hunt"></i>
                            <span>Products</span>
                        </button>
                        {isSubmenuOpen && (
                            <ul className="ml-4 space-y-2">
                                <li>
                                    <Link to="/admin/products" className="block text-gray-300 hover:text-white">
                                        <i className="fa fa-clipboard"></i>
                                        <span className="ml-3">All</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/product" className="block text-gray-300 hover:text-white">
                                        <i className="fa fa-plus"></i>
                                        <span className="ml-3">Create</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link to="/admin/orders" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                            <i className="fa fa-shopping-basket"></i>
                            <span>Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                            <i className="fa fa-users"></i>
                            <span>Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                            <i className="fa fa-star"></i>
                            <span>Reviews</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
