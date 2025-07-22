import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParcelList = () => {
    const [groupedParcels, setGroupedParcels] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/api/parcels/group-by-area', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }).then(response => setGroupedParcels(response.data));
    }, []);

    return (
        <div className="parcel-list">
            <h2>Parcels by Area</h2>
            {Object.entries(groupedParcels).map(([area, parcels]) => (
                <div key={area}>
                    <h3>{area}</h3>
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
            ))}
        </div>
    );
};

export default ParcelList;