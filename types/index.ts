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
