import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/parcels" className="hover:text-blue-200">
                        Parcels
                    </Link>
                    {(role === 'ADMIN' || role === 'SUPERVISOR') && (
                        <Link to="/supervisor-dashboard" className="hover:text-blue-200">
                            Dashboard
                        </Link>
                    )}
                    {(role === 'VENDOR' || role === 'ADMIN') && (
                        <Link to="/parcels/create" className="hover:text-blue-200">
                            Create Parcel
                        </Link>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
