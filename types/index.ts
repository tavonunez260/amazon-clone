import { Timestamp } from '@firebase/firestore';
import Stripe from 'stripe';

export type Rating = {
	count: number;
	rate: number;
};

export type ProductResponse = {
	category: string;
	description: string;
	id: number;
	image: string;
	price: number;
	rating: Rating;
	title: string;
};

export type ProductType = {
	category: string;
	count: number;
	description: string;
	hasPrime: boolean;
	id: number;
	image: string;
	price: number;
	rating: number;
	title: string;
};

export type CartState = {
	items: ProductType[];
};

export type RemoveItemHandler = {
	action: 'decrement' | 'delete';
	id: number;
};

export type FirebaseOrders = {
	amount: number;
	amount_shipping: number;
	id: string;
	images: string[];
	timestamp: Timestamp;
};

export type OrderType = {
	amount: number;
	amountShipping: number;
	id: string;
	images: string[];
	items: Array<Stripe.LineItem>;
	timestamp: number;
};
