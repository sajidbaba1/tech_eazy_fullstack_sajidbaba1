const initialState = {
    parcels: []
};

const parcelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PARCELS':
            return { ...state, parcels: action.payload };
        case 'ADD_PARCEL':
            return { ...state, parcels: [...state.parcels, action.payload] };
        default:
            return state;
    }
};

export default parcelReducer;