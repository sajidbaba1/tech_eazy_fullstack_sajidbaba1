import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from './LoadingSpinner';
import PerformanceMonitor from '../services/PerformanceMonitor';

// Virtual list optimization for large datasets
const VirtualizedList = React.lazy(() => import('react-window'));

function ParcelList() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { darkMode, reducedMotion } = useTheme();
    const role = localStorage.getItem('role');

    // Performance optimization for large datasets
    const sortedParcels = useMemo(() => {
        return [...parcels].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    }, [parcels]);

    // Debounced refresh function
    const debouncedRefresh = useCallback((fn) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), 300);
        };
    }, []);

    const fetchParcels = useCallback(async () => {
        const startTime = performance.now();
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('/api/parcels');
            setParcels(response.data);

            // Record performance metrics
            const endTime = performance.now();
            const loadTime = endTime - startTime;
            if (loadTime > 1000) {
                console.warn('Slow data fetch detected:', loadTime + 'ms');
            }
        } catch (err) {
            setError('Error loading parcels. Please try again.');
            console.error('Error fetching parcels:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchParcels();

        // Set up real-time updates if available
        const eventSource = new EventSource('/api/parcels/events');
        eventSource.onmessage = (event) => {
            const updatedParcel = JSON.parse(event.data);
            setParcels(current =>
                current.map(p => p.id === updatedParcel.id ? updatedParcel : p)
            );
        };

        return () => eventSource.close();
    }, [fetchParcels]);

    // Performance monitoring effect
    useEffect(() => {
        const metrics = PerformanceMonitor.getMetrics();
        if (metrics.averageLoadTime > 2000) {
            console.warn('Average load time is high:', metrics.averageLoadTime + 'ms');
        }
        return () => {
            // Record final metrics before component unmounts
            const finalMetrics = PerformanceMonitor.getMetrics();
            console.log('Component performance metrics:', finalMetrics);
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
                <LoadingSpinner size="large" overlay />
            </div>
        );
    }

    const ParcelCard = ({ parcel, index }) => (
        <div
            className={`
                bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md 
                hover:shadow-lg transform hover:-translate-y-1 
                transition-all duration-200 
                ${reducedMotion ? '' : 'animate-fade-in'}
                ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
            `}
            style={{
                animationDelay: `${index * 50}ms`,
                opacity: 0,
                animation: reducedMotion ? 'none' : `fadeIn 0.5s ease-out ${index * 50}ms forwards`
            }}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white transition-colors duration-200">
                        Tracking: {parcel.trackingNumber}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                        Customer: {parcel.customerUsername}
                    </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
                    parcel.status === 'PENDING' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                    parcel.status === 'ASSIGNED' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                    {parcel.status}
                </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                Driver: {parcel.driverId || 'Not Assigned'}
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Created: {new Date(parcel.createdAt).toLocaleDateString()}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-all duration-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                    Parcels
                </h2>
                <div className="space-x-4">
                    {(role === 'VENDOR' || role === 'ADMIN') && (
                        <Link
                            to="/parcels/create"
                            className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600
                                     dark:bg-green-600 dark:hover:bg-green-700 text-white rounded
                                     transition-all duration-200 transform hover:scale-105
                                     active:scale-95 focus:outline-none focus:ring-2
                                     focus:ring-green-500 focus:ring-opacity-50"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Create Parcel
                        </Link>
                    )}
                    <button
                        onClick={debouncedRefresh(fetchParcels)}
                        className="inline-flex items-center px-4 py-2 bg-blue-500
                                 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700
                                 text-white rounded transition-all duration-200
                                 transform hover:scale-105 active:scale-95
                                 focus:outline-none focus:ring-2 focus:ring-blue-500
                                 focus:ring-opacity-50"
                    >
                        <svg className={`w-5 h-5 mr-2 ${reducedMotion ? '' : 'animate-spin-slow'}`}
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400
                               dark:border-red-700 text-red-700 dark:text-red-200
                               px-4 py-3 rounded mb-4 transition-colors duration-200
                               animate-shake">
                    {error}
                </div>
            )}

            <Suspense fallback={<div>Loading...</div>}>
                {parcels.length > 100 ? (
                    <VirtualizedList
                        height={800}
                        itemCount={sortedParcels.length}
                        itemSize={200}
                        width="100%"
                    >
                        {({ index, style }) => (
                            <ParcelCard
                                parcel={sortedParcels[index]}
                                index={index}
                                style={style}
                            />
                        )}
                    </VirtualizedList>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedParcels.map((parcel, index) => (
                            <ParcelCard
                                key={parcel.id}
                                parcel={parcel}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </Suspense>
        </div>
    );
}

export default React.memo(ParcelList);
