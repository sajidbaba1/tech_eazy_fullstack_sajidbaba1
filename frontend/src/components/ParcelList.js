import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParcels } from '../redux/actions/parcelActions';
import { Link } from 'react-router-dom';

const ParcelList = () => {
    const dispatch = useDispatch();
    const parcels = useSelector((state) => state.parcel.parcels);
    const role = localStorage.getItem('role');

    useEffect(() => {
        dispatch(fetchParcels());
    }, [dispatch]);

    return (
        <div className="parcel-list">
            <h2>Parcels</h2>
            {role === 'ADMIN' || role === 'VENDOR' ? (
                <Link to="/parcels/new">
                    <button>Create Parcel</button>
                </Link>
            ) : null}
            {role === 'ADMIN' || role === 'SUPERVISOR' ? (
                <Link to="/supervisor-dashboard">
                    <button>Supervisor Dashboard</button>
                </Link>
            ) : null}
            <table>
                <thead>
                <tr>
                    <th>Tracking ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {parcels.map((parcel) => (
                    <tr key={parcel.trackingId}>
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