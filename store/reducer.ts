import { combineReducers } from 'redux';

import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
	cart: cartReducer
});

export default rootReducer;
