import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Use default export
import parcelReducer from './reducers/parcelReducer';

const rootReducer = combineReducers({
    parcels: parcelReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;