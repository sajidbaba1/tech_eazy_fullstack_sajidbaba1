import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createParcel } from '../redux/actions/parcelActions';

const ParcelForm = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        deliveryAddress: '',
        contactNumber: '',
        parcelSize: '',
        parcelWeight: ''
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createParcel(formData));
        setFormData({
            customerName: '',
            deliveryAddress: '',
            contactNumber: '',
            parcelSize: '',
            parcelWeight: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="parcel-form">
            <input name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer Name" required />
            <input name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} placeholder="Delivery Address" required />
            <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
            <input name="parcelSize" value={formData.parcelSize} onChange={handleChange} placeholder="Parcel Size" required />
            <input name="parcelWeight" value={formData.parcelWeight} onChange={handleChange} placeholder="Parcel Weight" type="number" required />
            <button type="submit">Create Parcel</button>
        </form>
    );
};

export default ParcelForm;