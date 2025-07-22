const initialState = {
    parcels: [],
    loading: false,
    error: null
};

const parcelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PARCELS_REQUEST':
        case 'CREATE_PARCEL_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_PARCELS_SUCCESS':
            return { ...state, loading: false, parcels: action.payload };
        case 'CREATE_PARCEL_SUCCESS':
            return { ...state, loading: false, parcels: [...state.parcels, action.payload] };
        case 'FETCH_PARCELS_FAILURE':
        case 'CREATE_PARCEL_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default parcelReducer;