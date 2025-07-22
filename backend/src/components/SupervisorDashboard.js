import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupervisorDashboard = () => {
    const [groupedParcels, setGroupedParcels] = useState({});
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/parcels/group-by-area', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }).then(response => setGroupedParcels(response.data));

        axios.get('http://localhost:8080/api/drivers', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }).then(response => setDrivers(response.data));
    }, []);

    const assignDriver = (parcelId, driverId) => {
        axios.post(`http://localhost:8080/api/parcels/${parcelId}/assign-driver/${driverId}`, {}, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }).then(() => alert('Driver assigned'));
    };

    return (
        <div className="supervisor-dashboard">
            <h2>Supervisor Dashboard</h2>
            {Object.keys(groupedParcels).map(area => (
                <div key={area}>
                    <h3>{area}</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Tracking ID</th>
                            <th>Customer</th>
                            <th>Assign Driver</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupedParcels[area].map(parcel => (
                            <tr key={parcel.id}>
                                <td>{parcel.trackingId}</td>
                                <td>{parcel.customerName}</td>
                                <td>
                                    <select onChange={(e) => assignDriver(parcel.id, e.target.value)}>
                                        <option value="">Select Driver</option>
                                        {drivers.map(driver => (
                                            <option key={driver.id} value={driver.id}>{driver.name}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default SupervisorDashboard;