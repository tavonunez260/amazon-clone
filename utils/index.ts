import { ProductType } from '@/types';

export const usdFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	currencyDisplay: 'code' // Output will use the currency code
});

export const getTotalCount = (items: ProductType[]) =>
	items.reduce((total, item) => total + item.count, 0);

export const getTotalPrice = (items: ProductType[]) =>
	items.reduce((total, item) => total + item.price * item.count, 0);
