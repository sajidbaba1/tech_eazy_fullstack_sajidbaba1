import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import parcelReducer from './reducers/parcelReducer';

const store = createStore(parcelReducer, applyMiddleware(thunk));

export default store;