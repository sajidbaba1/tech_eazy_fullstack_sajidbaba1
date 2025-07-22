import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DailyReport = () => {
    const [report, setReport] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/parcels/report/daily', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }).then(response => setReport(response.data));
    }, []);

    return (
        <div className="daily-report">
            <h2>Daily Report</h2>
            <table>
                <thead>
                <tr>
                    <th>Tracking ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {report.map(parcel => (
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

export default DailyReport;