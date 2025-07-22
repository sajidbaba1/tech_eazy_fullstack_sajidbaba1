import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SupervisorDashboard = () => {
    const [parcels, setParcels] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const [selectedParcel, setSelectedParcel] = useState('');
    const [selectedDriver, setSelectedDriver] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const parcelResponse = await axios.get('http://localhost:8080/api/parcels', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setParcels(parcelResponse.data);

                const driverResponse = await axios.get('http://localhost:8080/api/drivers', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDrivers(driverResponse.data);

                const reportResponse = await axios.get('http://localhost:8080/api/parcels/report/daily', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReports(reportResponse.data);
            } catch (err) {
                setError(err.response?.data || 'Failed to fetch data');
            }
        };
        fetchData();
    }, []);

    const assignDriver = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                `http://localhost:8080/api/parcels/${selectedParcel}/assign-driver/${selectedDriver}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Driver assigned successfully');
            setSelectedParcel('');
            setSelectedDriver('');
            const parcelResponse = await axios.get('http://localhost:8080/api/parcels', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setParcels(parcelResponse.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to assign driver');
        }
    };

    return (
        <div className="supervisor-dashboard">
            <h2>Supervisor Dashboard</h2>
            <Link to="/parcels">
                <button>Back to Parcels</button>
            </Link>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h3>Assign Driver</h3>
            <div>
                <select
                    value={selectedParcel}
                    onChange={(e) => setSelectedParcel(e.target.value)}
                >
                    <option value="">Select Parcel</option>
                    {parcels.map((parcel) => (
                        <option key={parcel.trackingId} value={parcel.id}>
                            {parcel.trackingId} - {parcel.customerName}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedDriver}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                >
                    <option value="">Select Driver</option>
                    {drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                            {driver.name} - {driver.vehicleType}
                        </option>
                    ))}
                </select>
                <button onClick={assignDriver} disabled={!selectedParcel || !selectedDriver}>
                    Assign Driver
                </button>
            </div>
            <h3>Daily Reports</h3>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Total Parcels</th>
                    <th>Delivered</th>
                    <th>In Transit</th>
                    <th>Pending</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report, index) => (
                    <tr key={index}>
                        <td>{report.date}</td>
                        <td>{report.totalParcels}</td>
                        <td>{report.delivered}</td>
                        <td>{report.inTransit}</td>
                        <td>{report.pending}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupervisorDashboard;