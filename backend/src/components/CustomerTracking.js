import React, { useState } from 'react';
import axios from 'axios';

const CustomerTracking = () => {
    const [trackingId, setTrackingId] = useState('');
    const [parcel, setParcel] = useState(null);

    const handleTrack = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/parcels/${trackingId}`);
            setParcel(response.data);
        } catch (error) {
            alert('Parcel not found');
        }
    };

    return (
        <div className="customer-tracking">
            <h2>Track Parcel</h2>
            <form onSubmit={handleTrack}>
                <input type="text" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="Tracking ID" required />
                <button type="submit">Track</button>
            </form>
            {parcel && (
                <div>
                    <p>Tracking ID: {parcel.trackingId}</p>
                    <p>Customer: {parcel.customerName}</p>
                    <p>Status: {parcel.status}</p>
                    <p>Address: {parcel.deliveryAddress}</p>
                </div>
            )}
        </div>
    );
};

export default CustomerTracking;