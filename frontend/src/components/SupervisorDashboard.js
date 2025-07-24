import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axiosConfig';
import LoadingSpinner from './LoadingSpinner';

function SupervisorDashboard() {
    const [parcels, setParcels] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [assignmentError, setAssignmentError] = useState({});
    const [driverIds, setDriverIds] = useState({});
    const [assigning, setAssigning] = useState({});

    const fetchDrivers = useCallback(async () => {
        try {
            const response = await axios.get('/drivers');
            setDrivers(response.data);
        } catch (err) {
            console.error('Error fetching drivers:', err);
        }
    }, []);

    const fetchParcels = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('/parcels');

            // Handle the case where response contains a message instead of parcel array
            if (response.data.message) {
                setParcels([]);
                setError(response.data.message);
                return;
            }

            setParcels(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError(err.response?.data?.message || 'Error loading parcels. Please try again.');
            setParcels([]);
            console.error('Error fetching parcels:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        Promise.all([fetchParcels(), fetchDrivers()]);
    }, [fetchParcels, fetchDrivers]);

    const assignDriver = async (parcelId) => {
        const driverId = driverIds[parcelId];
        if (!driverId?.toString()?.trim()) {
            setAssignmentError({ ...assignmentError, [parcelId]: 'Please select a driver' });
            return;
        }

        try {
            setAssigning({ ...assigning, [parcelId]: true });
            setAssignmentError({ ...assignmentError, [parcelId]: '' });

            const response = await axios.post(`/parcels/assign?parcelId=${parcelId}&driverId=${driverId}`);
            setParcels(parcels.map(p => p.id === parcelId ? response.data : p));
            setDriverIds({ ...driverIds, [parcelId]: '' });
        } catch (err) {
            setAssignmentError({
                ...assignmentError,
                [parcelId]: err.response?.data?.message || 'Error assigning driver'
            });
        } finally {
            setAssigning({ ...assigning, [parcelId]: false });
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Supervisor Dashboard</h2>
                <button
                    onClick={() => Promise.all([fetchParcels(), fetchDrivers()])}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Refresh
                </button>
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
                                    <select
                                        value={driverIds[parcel.id] || ''}
                                        onChange={(e) => setDriverIds({
                                            ...driverIds,
                                            [parcel.id]: e.target.value
                                        })}
                                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={assigning[parcel.id]}
                                    >
                                        <option value="">Select Driver</option>
                                        {drivers.map(driver => (
                                            <option key={driver.id} value={driver.id}>
                                                {driver.name} ({driver.vehicleType})
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => assignDriver(parcel.id)}
                                        className={`px-4 py-2 rounded ${
                                            assigning[parcel.id]
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-blue-500 hover:bg-blue-600'
                                        } text-white transition-colors`}
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
            )}
        </div>
    );
}

export default SupervisorDashboard;