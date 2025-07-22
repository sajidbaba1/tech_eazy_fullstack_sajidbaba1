import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

function ParcelList() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const role = localStorage.getItem('role');

    const fetchParcels = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('/api/parcels');
            setParcels(response.data);
        } catch (err) {
            setError('Error loading parcels. Please try again.');
            console.error('Error fetching parcels:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchParcels();
    }, [fetchParcels]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Parcels</h2>
                <div>
                    {(role === 'VENDOR' || role === 'ADMIN') && (
                        <Link
                            to="/parcels/create"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
                        >
                            Create Parcel
                        </Link>
                    )}
                    <button
                        onClick={fetchParcels}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {parcels.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    No parcels found
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {parcels.map(parcel => (
                        <div key={parcel.id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">
                                        Tracking: {parcel.trackingNumber}
                                    </h3>
                                    <p className="text-gray-600">
                                        Customer: {parcel.customerUsername}
                                    </p>
                                </div>
                                <span className={`px-2 py-1 rounded text-sm ${
                                    parcel.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                    parcel.status === 'ASSIGNED' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {parcel.status}
                                </span>
                            </div>
                            <p className="text-gray-600">
                                Driver: {parcel.driverId || 'Not Assigned'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ParcelList;