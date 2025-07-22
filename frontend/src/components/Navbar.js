import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 shadow-md transition-colors duration-200">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/parcels" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
                        Parcels
                    </Link>
                    {(role === 'ADMIN' || role === 'SUPERVISOR') && (
                        <Link to="/supervisor-dashboard" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
                            Dashboard
                        </Link>
                    )}
                    {(role === 'VENDOR' || role === 'ADMIN') && (
                        <Link to="/parcels/create" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
                            Create Parcel
                        </Link>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <button
                        onClick={handleLogout}
                        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200 transform hover:scale-105 active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
