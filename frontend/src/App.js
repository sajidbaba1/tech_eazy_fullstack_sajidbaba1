import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './components/Login';
import ParcelList from './components/ParcelList';
import SupervisorDashboard from './components/SupervisorDashboard';
import ParcelForm from './components/ParcelForm';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute
                                    element={
                                        <>
                                            <Navbar />
                                            <ParcelList />
                                        </>
                                    }
                                />
                            }
                        />
                        <Route
                            path="/parcels"
                            element={
                                <PrivateRoute
                                    element={
                                        <>
                                            <Navbar />
                                            <ParcelList />
                                        </>
                                    }
                                />
                            }
                        />
                        <Route
                            path="/parcels/create"
                            element={
                                <PrivateRoute
                                    element={
                                        <>
                                            <Navbar />
                                            <ParcelForm />
                                        </>
                                    }
                                    requiredRoles={['VENDOR', 'ADMIN']}
                                />
                            }
                        />
                        <Route
                            path="/supervisor-dashboard"
                            element={
                                <PrivateRoute
                                    element={
                                        <>
                                            <Navbar />
                                            <SupervisorDashboard />
                                        </>
                                    }
                                    requiredRoles={['ADMIN', 'SUPERVISOR']}
                                />
                            }
                        />
                        <Route path="*" element={<Navigate to="/parcels" replace />} />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;