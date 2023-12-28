import { ProductType } from '@/types';

export const copFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	currencyDisplay: 'code' // Output will use the currency code
});

export const getTotalCount = (items: ProductType[]) =>
	items.reduce((total, item) => total + item.count, 0);
