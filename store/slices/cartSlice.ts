import { createSlice } from '@reduxjs/toolkit';

import { CartState, ProductType } from '@/types';

const initialState: CartState = {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: { payload: ProductType }) => {
			state.items = [...state.items, action.payload];
		},
		removeFromCart: (state, action: { payload: number }) => {
			const index = state.items.findIndex(item => item.id === action.payload);
			const newCart = [...state.items];
			if (index >= 0) {
				newCart.splice(index, 1);
			}
			state.items = newCart;
		}
	}
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
