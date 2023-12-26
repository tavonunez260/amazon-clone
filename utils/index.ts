export const copFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	currencyDisplay: 'code' // Output will use the currency code
});
