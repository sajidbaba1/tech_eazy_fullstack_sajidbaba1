import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axiosConfig';

function SupervisorDashboard() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [assignmentError, setAssignmentError] = useState({});
    const [driverIds, setDriverIds] = useState({});
    const [assigning, setAssigning] = useState({});

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

    const assignDriver = async (parcelId) => {
        const driverId = driverIds[parcelId];
        if (!driverId?.trim()) {
            setAssignmentError({ ...assignmentError, [parcelId]: 'Please enter a driver ID' });
            return;
        }

        try {
            setAssigning({ ...assigning, [parcelId]: true });
            setAssignmentError({ ...assignmentError, [parcelId]: '' });

            const response = await axios.post(`/api/parcels/assign?parcelId=${parcelId}&driverId=${driverId}`);
            setParcels(parcels.map(p => p.id === parcelId ? response.data : p));
            setDriverIds({ ...driverIds, [parcelId]: '' });
        } catch (err) {
            setAssignmentError({
                ...assignmentError,
                [parcelId]: err.response?.data || 'Error assigning driver'
            });
        } finally {
            setAssigning({ ...assigning, [parcelId]: false });
        }
    };

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
                <h2 className="text-2xl font-bold">Supervisor Dashboard</h2>
                <button
                    onClick={fetchParcels}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Refresh
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

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
                        <p className="text-gray-600 mb-4">
                            Current Driver: {parcel.driverId || 'Not Assigned'}
                        </p>
                        <div className="mt-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Driver ID"
                                    value={driverIds[parcel.id] || ''}
                                    onChange={(e) => setDriverIds({
                                        ...driverIds,
                                        [parcel.id]: e.target.value
                                    })}
                                    className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={assigning[parcel.id]}
                                />
                                <button
                                    onClick={() => assignDriver(parcel.id)}
                                    className={`px-4 py-2 rounded ${
                                        assigning[parcel.id]
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white`}
                                    disabled={assigning[parcel.id]}
                                >
                                    {assigning[parcel.id] ? 'Assigning...' : 'Assign'}
                                </button>
                            </div>
                            {assignmentError[parcel.id] && (
                                <p className="text-red-500 text-sm mt-2">
                                    {assignmentError[parcel.id]}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SupervisorDashboard;