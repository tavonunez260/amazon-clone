import { configureStore } from '@reduxjs/toolkit';

import basketReducer from '@/slices/basketSlice';

export * from './StoreProvider';
export const store = configureStore({
	reducer: {
		basket: basketReducer
	}
});
