'use client';

import Image from 'next/image';

import { Header } from '@/components';
import { CheckoutProduct } from '@/components/CheckoutProduct';
import { addToCart, removeFromCart, useDispatch, useSelector } from '@/store';
import { ProductType } from '@/types';

export default function Checkout() {
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch();
	const handleAddItemToCart = (product: ProductType) => {
		dispatch(addToCart(product));
	};
	const handleRemoveItemFromCart = (id: number, action: 'delete' | 'decrement') => {
		dispatch(removeFromCart({ action, id }));
	};

	return (
		<main className="bg-gray-100">
			<Header />
			<section className="lg:flex max-w-screen-2xl mx-auto">
				<div className="flex-grow-0 m-5 shadow-sm">
					<Image
						alt="checkout-banner"
						className="object-contain"
						height={250}
						src="https://links.papareact.com/ikj"
						width={1020}
					/>
					<div className="flex flex-col p-5 gap-10 bg-white">
						<h1 className="text-3xl border-b pb-4">
							{cart.items.length === 0 ? 'Your cart is empty' : 'Cart'}
						</h1>
						{cart.items.map(product => (
							<CheckoutProduct
								key={product.id}
								handleAddItemToCart={handleAddItemToCart}
								handleRemoveItemFromCart={handleRemoveItemFromCart}
								product={product}
							/>
						))}
					</div>
				</div>
				<div />
			</section>
		</main>
	);
}
