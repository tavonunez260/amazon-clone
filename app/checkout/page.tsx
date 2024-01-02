'use client';

import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import clsx from 'clsx';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { Header } from '@/components';
import { CheckoutProduct } from '@/components/CheckoutProduct';
import { addToCart, removeFromCart, useDispatch, useSelector } from '@/store';
import { ProductType } from '@/types';
import { getTotalCount, getTotalPrice, usdFormatter } from '@/utils';

const stripePromise = loadStripe(process.env.stripe_public_key as string);

export default function Checkout() {
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch();
	const { data } = useSession();

	const handleAddItemToCart = (product: ProductType) => {
		dispatch(addToCart(product));
	};
	const handleRemoveItemFromCart = (id: number, action: 'delete' | 'decrement') => {
		dispatch(removeFromCart({ action, id }));
	};
	const handleCheckout = async () => {
		if (data && data.user) {
			const stripe = await stripePromise;
			const checkoutSession = await axios.post('/api/create-checkout-session', {
				items: cart.items,
				email: data.user.email
			});

			const result = await stripe?.redirectToCheckout({ sessionId: checkoutSession.data.id });
			if (result && result.error) alert(result.error.message);
		}
	};

	return (
		<main className="bg-gray-100">
			<Header />
			<section className="lg:flex gap-5 max-w-screen-2xl mx-auto">
				<div
					className={clsx(
						`flex-grow-0 my-5 ${getTotalCount(cart.items) === 0 && 'w-full shadow-md'}`
					)}
				>
					<Image
						alt="checkout-banner"
						className="w-full object-contain"
						height={250}
						src="https://links.papareact.com/ikj"
						width={1020}
					/>
					<div className="flex flex-col p-5 gap-10 bg-white">
						<h1 className="text-3xl border-b pb-4">
							{getTotalCount(cart.items) === 0 ? 'Your cart is empty' : 'Cart'}
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
				{cart.items.length > 0 && (
					<div className="flex flex-col bg-white p-10 my-5 shadow-md">
						<h2 className="whitespace-nowrap">
							Subtotal ({getTotalCount(cart.items)} items):
							<span className="font-bold ml-2">
								{usdFormatter.format(getTotalPrice(cart.items))}
							</span>
						</h2>
						<button className="button mt-2" disabled={!data} role="link" onClick={handleCheckout}>
							{!data ? 'Sign In to checkout' : 'Proceed to checkout'}
						</button>
					</div>
				)}
			</section>
		</main>
	);
}
