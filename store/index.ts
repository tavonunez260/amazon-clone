import { configureStore } from '@reduxjs/toolkit';
import {
	useDispatch as useAppDispatch,
	useSelector as useAppSelector,
	TypedUseSelectorHook
} from 'react-redux';

import rootReducer from './reducer';

export * from './slices';
export * from './StoreProvider';

export const store = configureStore({
	reducer: rootReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
