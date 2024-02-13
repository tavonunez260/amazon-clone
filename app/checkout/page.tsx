'use client';

import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import { Header } from '@/components';
import { CheckoutProduct } from '@/components/CheckoutProduct';
import { addToCart, removeFromCart, useDispatch, useSelector } from '@/store';
import { ProductType } from '@/types';
import { getTotalCount, getTotalPrice, usdFormatter } from '@/utils';

const stripePromise = loadStripe(process.env.stripe_public_key ?? '');

export default function Checkout() {
	const [checkoutLoading, setCheckoutLoading] = useState(false);
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch();
	const { data } = useSession();
	const router = useRouter();

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

			setCheckoutLoading(true);
			const result = await stripe?.redirectToCheckout({ sessionId: checkoutSession.data.id });
			setCheckoutLoading(false);
			if (result && result.error) alert(result.error.message);
		}
	};

	useEffect(() => {
		if (!data) {
			router.push('/');
		}
	}, [data, router]);

	return (
		<main className="bg-gray-100 min-h-screen">
			<Header />
			<section className="lg:flex gap-5 max-w-screen-2xl mx-auto">
				<div
					className={clsx(
						`flex-grow-0 my-5 ${getTotalCount(cart.items) === 0 && 'w-full shadow-md'}`
					)}
				>
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
						<button
							className="button mt-2"
							disabled={!data || checkoutLoading}
							role="link"
							onClick={handleCheckout}
						>
							{!data
								? 'Sign In to checkout'
								: !checkoutLoading
									? 'Proceed to checkout'
									: 'Loading...'}
						</button>
					</div>
				)}
			</section>
		</main>
	);
}
