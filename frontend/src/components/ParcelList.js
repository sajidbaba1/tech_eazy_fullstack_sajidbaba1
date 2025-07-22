import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParcels } from '../redux/actions/parcelActions';

const ParcelList = () => {
    const dispatch = useDispatch();
    const parcels = useSelector(state => state.parcels.parcels);

    useEffect(() => {
        dispatch(fetchParcels());
    }, [dispatch]);

    return (
        <div className="parcel-list">
            <h2>Parcels</h2>
            <table>
                <thead>
                <tr>
                    <th>Tracking ID</th>
                    <th>Customer Name</th>
                    <th>Address</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {parcels.map(parcel => (
                    <tr key={parcel.id}>
                        <td>{parcel.trackingId}</td>
                        <td>{parcel.customerName}</td>
                        <td>{parcel.deliveryAddress}</td>
                        <td>{parcel.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParcelList;