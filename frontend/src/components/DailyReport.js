import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from './LoadingSpinner';
import PerformanceMonitor from '../services/PerformanceMonitor';
import axios from '../axiosConfig';

const DailyReport = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { darkMode, reducedMotion } = useTheme();

    const fetchStats = useCallback(async () => {
        const startTime = performance.now();
        try {
            setLoading(true);
            const response = await axios.get('/api/parcels/stats/daily');
            setStats(response.data);

            const endTime = performance.now();
            PerformanceMonitor.metrics.loadTimes.push({
                timestamp: Date.now(),
                duration: endTime - startTime,
                type: 'daily-stats'
            });
        } catch (err) {
            setError('Failed to load daily statistics');
            console.error('Error fetching stats:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 300000); // Refresh every 5 minutes
        return () => clearInterval(interval);
    }, [fetchStats]);

    if (loading) {
        return <LoadingSpinner size="large" overlay />;
    }

    if (error) {
        return (
            <div className={`
                p-4 rounded-lg bg-red-100 dark:bg-red-900
                text-red-700 dark:text-red-200
                ${reducedMotion ? '' : 'animate-shake'}
            `}>
                {error}
            </div>
        );
    }

    const StatCard = ({ title, value, icon, color }) => (
        <div className={`
            bg-white dark:bg-gray-800 
            rounded-lg p-6 shadow-lg
            transform transition-all duration-300
            hover:shadow-xl hover:-translate-y-1
            ${reducedMotion ? '' : 'animate-fade-in'}
        `}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Daily Statistics
                    </h2>
                    <button
                        onClick={fetchStats}
                        className={`
                            inline-flex items-center px-4 py-2
                            bg-blue-500 hover:bg-blue-600
                            dark:bg-blue-600 dark:hover:bg-blue-700
                            text-white rounded-lg
                            transition-all duration-200
                            transform hover:scale-105 active:scale-95
                        `}
                    >
                        <svg
                            className={`w-5 h-5 mr-2 ${reducedMotion ? '' : 'animate-spin-slow'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Refresh
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Parcels"
                        value={stats?.totalParcels || 0}
                        color="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        }
                    />

                    <StatCard
                        title="Pending Deliveries"
                        value={stats?.pendingDeliveries || 0}
                        color="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    />

                    <StatCard
                        title="Delivered Today"
                        value={stats?.deliveredToday || 0}
                        color="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        }
                    />

                    <StatCard
                        title="Active Drivers"
                        value={stats?.activeDrivers || 0}
                        color="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        }
                    />
                </div>

                {stats?.performanceMetrics && (
                    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Performance Metrics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Average Delivery Time</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {stats.performanceMetrics.avgDeliveryTime} hours
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {stats.performanceMetrics.successRate}%
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Customer Satisfaction</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {stats.performanceMetrics.customerSatisfaction}/5
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyReport;
