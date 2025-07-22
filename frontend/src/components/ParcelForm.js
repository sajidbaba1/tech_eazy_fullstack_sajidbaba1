import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createParcel } from '../redux/actions/parcelActions';

const ParcelForm = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.parcels);
    const [formData, setFormData] = useState({
        customerName: '',
        deliveryAddress: '',
        contactNumber: '',
        parcelSize: '',
        deliveryArea: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createParcel(formData));
    };

    return (
        <div className="parcel-form">
            <h2>Create Parcel</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="customerName"
                    placeholder="Customer Name"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="deliveryAddress"
                    placeholder="Delivery Address"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="parcelSize"
                    placeholder="Parcel Size"
                    value={formData.parcelSize}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="deliveryArea"
                    placeholder="Delivery Area"
                    value={formData.deliveryArea}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>Create Parcel</button>
            </form>
        </div>
    );
};

export default ParcelForm;