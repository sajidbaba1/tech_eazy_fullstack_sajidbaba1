import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ParcelForm() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [customerUsername, setCustomerUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/parcels/create', {
                trackingNumber,
                customerUsername,
                status: 'PENDING'
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            navigate('/parcels');
        } catch (err) {
            console.error('Error creating parcel:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Parcel</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Tracking Number</label>
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Customer Username</label>
                    <input
                        type="text"
                        value={customerUsername}
                        onChange={(e) => setCustomerUsername(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-blue-600">
                    Create Parcel
                </button>
            </form>
        </div>
    );
}

export default ParcelForm;