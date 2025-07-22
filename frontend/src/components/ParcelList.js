import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParcelList = () => {
    const [parcels, setParcels] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParcels = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/parcels', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setParcels(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch parcels');
            }
        };
        fetchParcels();
    }, []);

    return (
        <div className="parcel-list">
            <h2>Parcels</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                <tr>
                    <th>Tracking ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {parcels.map(parcel => (
                    <tr key={parcel.id}>
                        <td>{parcel.trackingId}</td>
                        <td>{parcel.customerName}</td>
                        <td>{parcel.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParcelList;