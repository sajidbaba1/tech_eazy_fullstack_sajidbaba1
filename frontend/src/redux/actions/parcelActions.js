import axios from 'axios';

export const fetchParcels = () => async (dispatch) => {
    dispatch({ type: 'FETCH_PARCELS_REQUEST' });
    const token = localStorage.getItem('token');
    console.log('Sending request with token:', token); // Debug log
    if (!token) {
        dispatch({ type: 'FETCH_PARCELS_FAILURE', payload: 'No JWT token found' });
        window.location.href = '/login';
        return;
    }
    try {
        const response = await axios.get('http://localhost:8080/api/parcels', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        dispatch({ type: 'FETCH_PARCELS_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Fetch parcels error:', error.response);
        if (error.response?.status === 403) {
            window.location.href = '/login';
        }
        dispatch({ type: 'FETCH_PARCELS_FAILURE', payload: error.response?.data?.message || 'Failed to fetch parcels' });
    }
};

export const createParcel = (parcelData) => async (dispatch) => {
    dispatch({ type: 'CREATE_PARCEL_REQUEST' });
    const token = localStorage.getItem('token');
    console.log('Creating parcel with token:', token); // Debug log
    if (!token) {
        dispatch({ type: 'CREATE_PARCEL_FAILURE', payload: 'No JWT token found' });
        window.location.href = '/login';
        return;
    }
    try {
        const response = await axios.post('http://localhost:8080/api/parcels', parcelData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        dispatch({ type: 'CREATE_PARCEL_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Create parcel error:', error.response);
        if (error.response?.status === 403) {
            window.location.href = '/login';
        }
        dispatch({ type: 'CREATE_PARCEL_FAILURE', payload: error.response?.data?.message || 'Failed to create parcel' });
    }
};