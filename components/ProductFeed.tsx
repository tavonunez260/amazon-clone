'use client';

import { Product } from '@/components/Product';
import { addToCart, useDispatch } from '@/store';
import { ProductType } from '@/types';

interface ProductFeedProps {
	products: ProductType[];
}

export function ProductFeed({ products }: ProductFeedProps) {
	const dispatch = useDispatch();
	const handleAddItemToCart = (product: ProductType) => {
		dispatch(addToCart(product));
	};

	return (
		<div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:-mt-52 mx-auto">
			{products.slice(0, 4).map(product => (
				<Product key={product.id} handleAddItemToCart={handleAddItemToCart} product={product} />
			))}
			<img alt="" className="md:col-span-full w-full" src="https://links.papareact.com/dyz" />
			{products.slice(4, products.length).map(product => (
				<Product key={product.id} handleAddItemToCart={handleAddItemToCart} product={product} />
			))}
		</div>
	);
}
