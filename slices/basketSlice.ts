// import { createSlice } from '@reduxjs/toolkit';

import { BasketType } from '@/types';

export const initialState: BasketType = {
	items: []
};

// export const basketSlice = createSlice({
// 	name: 'basket',
// 	initialState,
// 	reducers: {
// 		addToBasket: (state, action) => {},
// 		removeFromBasket: (state, action) => {}
// 	}
// });
//
// export const { addToBasket, removeFromBasket } = basketSlice.actions;
//
// // Selectors - This is how we pull information from the Global store slice
// export const selectItems = state => state.basket.items;
//
// export default basketSlice.reducer;
