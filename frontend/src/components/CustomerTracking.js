import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from './LoadingSpinner';
import PerformanceMonitor from '../services/PerformanceMonitor';

const CustomerTracking = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [parcel, setParcel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { darkMode, reducedMotion } = useTheme();

    const handleTrack = async (e) => {
        e.preventDefault();
        const startTime = performance.now();

        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`/api/parcels/track/${trackingNumber}`);
            setParcel(response.data);

            // Record performance metrics
            const endTime = performance.now();
            PerformanceMonitor.metrics.loadTimes.push({
                timestamp: Date.now(),
                duration: endTime - startTime,
                type: 'tracking-lookup'
            });
        } catch (err) {
            setError('No parcel found with this tracking number');
            setParcel(null);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            PENDING: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
            ASSIGNED: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
            IN_TRANSIT: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
            DELIVERED: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
        };
        return colors[status] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-all duration-200">
            <div className="max-w-2xl mx-auto">
                <div className={\`
                    bg-white dark:bg-gray-800
                    rounded-lg shadow-lg p-6
                    transform transition-all duration-300
                    \${reducedMotion ? '' : 'hover:shadow-xl'}
                \`}>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                        Track Your Parcel
                    </h2>

                    <form onSubmit={handleTrack} className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                                placeholder="Enter tracking number (e.g., TRK123)"
                                className={\`
                                    w-full px-4 py-2 rounded-lg
                                    border-2 border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-gray-700
                                    text-gray-900 dark:text-white
                                    placeholder-gray-500 dark:placeholder-gray-400
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                    transition-all duration-200
                                \`}
                            />
                            <button
                                type="submit"
                                disabled={loading || !trackingNumber}
                                className={\`
                                    absolute right-2 top-2
                                    px-4 py-1 rounded-md
                                    bg-blue-500 hover:bg-blue-600
                                    dark:bg-blue-600 dark:hover:bg-blue-700
                                    text-white
                                    transition-all duration-200
                                    transform hover:scale-105 active:scale-95
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    \${loading ? 'cursor-wait' : ''}
                                \`}
                            >
                                {loading ? 'Tracking...' : 'Track'}
                            </button>
                        </div>
                    </form>

                    {loading && (
                        <div className="flex justify-center my-8">
                            <LoadingSpinner size="medium" />
                        </div>
                    )}

                    {error && (
                        <div className={\`
                            mt-4 p-4 rounded-lg
                            bg-red-100 dark:bg-red-900
                            text-red-700 dark:text-red-200
                            border border-red-400 dark:border-red-700
                            \${reducedMotion ? '' : 'animate-shake'}
                        \`}>
                            {error}
                        </div>
                    )}

                    {parcel && (
                        <div className={\`
                            mt-6 space-y-4
                            transform transition-all duration-300
                            \${reducedMotion ? '' : 'animate-fade-in'}
                        \`}>
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Parcel Details
                                </h3>
                                <span className={\`
                                    px-3 py-1 rounded-full text-sm font-medium
                                    \${getStatusColor(parcel.status)}
                                \`}>
                                    {parcel.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Customer
                                    </p>
                                    <p className="text-gray-900 dark:text-white">
                                        {parcel.customerUsername}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Driver
                                    </p>
                                    <p className="text-gray-900 dark:text-white">
                                        {parcel.driverId || 'Not Assigned'}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Created At
                                    </p>
                                    <p className="text-gray-900 dark:text-white">
                                        {new Date(parcel.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Last Updated
                                    </p>
                                    <p className="text-gray-900 dark:text-white">
                                        {new Date(parcel.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerTracking;
