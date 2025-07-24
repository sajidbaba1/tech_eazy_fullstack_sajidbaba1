import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function ParcelForm() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [customerUsername, setCustomerUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Check if user has permission to create parcels
    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'VENDOR' && role !== 'ADMIN') {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            if (!trackingNumber || !customerUsername) {
                setError('Tracking number and customer username are required');
                return;
            }

            const response = await axios.post('/parcels/create', {
                trackingNumber: trackingNumber.toUpperCase(),
                customerUsername,
                status: 'PENDING'
            });

            if (response.data) {
                navigate('/parcels');
            } else {
                setError('Failed to create parcel. Please try again.');
            }
        } catch (err) {
            console.error('Error creating parcel:', err);
            setError(err.response?.data?.message || 'Error creating parcel. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Create Parcel</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Tracking Number
                        </label>
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={loading}
                            placeholder="e.g., TRK12345"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Customer Username
                        </label>
                        <input
                            type="text"
                            value={customerUsername}
                            onChange={(e) => setCustomerUsername(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={loading}
                            placeholder="Enter customer username"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 
                            transition-colors duration-200 
                            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Parcel'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ParcelForm;