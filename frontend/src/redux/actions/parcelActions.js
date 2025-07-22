import axios from 'axios';

export const fetchParcels = () => async dispatch => {
    const response = await axios.get('http://localhost:8080/api/parcels');
    dispatch({ type: 'SET_PARCELS', payload: response.data });
};

export const createParcel = (parcel) => async dispatch => {
    const response = await axios.post('http://localhost:8080/api/parcels', parcel);
    dispatch({ type: 'ADD_PARCEL', payload: response.data });
};