import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axiosConfig';
import LoadingSpinner from './LoadingSpinner';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function ParcelList() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const fetchParcels = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('/parcels');

            // Handle empty response with message
            if (response.data.message) {
                setParcels([]);
                setError(response.data.message);
                return;
            }

            setParcels(response.data);
        } catch (err) {
            console.error('Error fetching parcels:', err);
            setError(err.response?.data?.message || 'Error loading parcels. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchParcels();
    }, [fetchParcels]);

    const getStatusColor = (status) => {
        const colors = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            ASSIGNED: 'bg-blue-100 text-blue-800',
            IN_TRANSIT: 'bg-purple-100 text-purple-800',
            DELIVERED: 'bg-green-100 text-green-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Parcels</h2>
                    <div className="space-x-4">
                        {(role === 'VENDOR' || role === 'ADMIN') && (
                            <button
                                onClick={() => navigate('/parcels/create')}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Create Parcel
                            </button>
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

                {parcels.length === 0 && !error ? (
                    <div className="text-center py-8 bg-white rounded-lg shadow">
                        <p className="text-gray-500">No parcels found</p>
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
                                        {parcel.vendorUsername && (
                                            <p className="text-gray-600">
                                                Vendor: {parcel.vendorUsername}
                                            </p>
                                        )}
                                    </div>
                                    <span className={`px-2 py-1 rounded text-sm ${getStatusColor(parcel.status)}`}>
                                        {parcel.status}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>Driver: {parcel.driverId || 'Not Assigned'}</p>
                                    <p>Created: {format(new Date(parcel.createdAt), 'PPP p')}</p>
                                    <p>Updated: {format(new Date(parcel.updatedAt), 'PPP p')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ParcelList;
