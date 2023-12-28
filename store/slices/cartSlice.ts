import { createSlice } from '@reduxjs/toolkit';

import { CartState, ProductType, RemoveItemHandler } from '@/types';

const initialState: CartState = {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: { payload: ProductType }) => {
			const item = state.items.find(item => item.id === action.payload.id);
			if (!item) {
				state.items = [...state.items, action.payload];
			} else {
				const newCart = [...state.items];
				const index = state.items.findIndex(item => item.id === action.payload.id);
				newCart[index].count += 1;
				state.items = newCart;
			}
		},
		removeFromCart: (state, action: { payload: RemoveItemHandler }) => {
			if (action.payload.action === 'delete') {
				const index = state.items.findIndex(item => item.id === action.payload.id);
				if (index !== -1) {
					state.items.splice(index, 1);
				}
			} else if (action.payload.action === 'decrement') {
				const index = state.items.findIndex(item => item.id === action.payload.id);
				if (index !== -1) {
					state.items[index].count -= 1;
				}
			}
		}
	}
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
