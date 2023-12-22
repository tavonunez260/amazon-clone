import { configureStore } from '@reduxjs/toolkit';

export * from './StoreProvider';
export const store = configureStore({
	reducer: {}
});
