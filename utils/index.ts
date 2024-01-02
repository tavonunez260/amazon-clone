import { ProductType } from '@/types';

export const usdFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	currencyDisplay: 'code' // Output will use the currency code
});

export const allowedCountries = [
	'US',
	'CA',
	'GB',
	'AU',
	'NZ',
	'IE',
	'DE',
	'FR',
	'ES',
	'IT',
	'JP',
	'AR',
	'CO',
	'MX',
	'PE',
	'CL',
	'UY',
	'VE',
	'EC',
	'BR'
];

export const getTotalCount = (items: ProductType[]) =>
	items.reduce((total, item) => total + item.count, 0);

export const getTotalPrice = (items: ProductType[]) =>
	items.reduce((total, item) => total + item.price * item.count, 0);

export const transformedItems = (items: ProductType[]) =>
	items.map(item => ({
		description: item.description,
		price_data: {
			currency: 'usd',
			product_data: {
				name: item.title,
				images: [item.image]
			},
			unit_amount: item.price * 100
		},
		quantity: item.count
	}));
