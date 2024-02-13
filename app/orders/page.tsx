'use client';

import { collection, getDocs, orderBy, query } from '@firebase/firestore';
import moment from 'moment';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Stripe from 'stripe';

import { Header, Order, Spinner } from '@/components';
import { db } from '@/firebase';
import { FirebaseOrders, OrderType } from '@/types';

const getOrders = async (context: Session | null): Promise<Awaited<OrderType>[] | undefined> => {
	const stripe = new Stripe(process.env.stripe_secret_key as string, {
		apiVersion: '2023-10-16'
	});

	if (context) {
		const ordersRef = collection(db, 'users', context?.user?.email ?? '', 'orders');
		const queryConst = query(ordersRef, orderBy('timestamp', 'desc'));
		const ordersDocs = await getDocs(queryConst);
		const ordersFirebase = ordersDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));

		return Promise.all(
			(ordersFirebase as FirebaseOrders[]).map(async order => ({
				id: order.id,
				amount: order.amount,
				amountShipping: order.amount_shipping,
				images: order.images,
				timestamp: moment(order.timestamp.toDate()).unix(),
				items: (await stripe.checkout.sessions.listLineItems(order.id, { limit: 100 })).data
			}))
		);
	}
};

export default function Success() {
	const { data } = useSession();
	const [ordersLoading, setOrdersLoading] = useState(true);
	const [orders, setOrders] = useState<OrderType[] | undefined>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const orders = await getOrders(data);
			setOrders(orders);
		};
		if (data) fetchOrders().then(() => setOrdersLoading(false));
	}, [data]);

	return (
		<main className="bg-gray-100 min-h-screen">
			<Header />
			<section className="max-w-screen-lg mx-auto mt-5 pb-5">
				<h1 className="text-3xl font-semibold border-b mb-2 pb-1 border-yellow-400">
					Your orders.
				</h1>
				{data ? (
					<h2 className="text-sm text-gray-500">
						You have no orders yet. Once you place an order, it will appear here.
					</h2>
				) : (
					<h2 className="text-sm text-gray-500">
						You need to sign in to see your orders. Once you place an order, it will appear here.
					</h2>
				)}
				<div className="mt-5 flex flex-col gap-5">
					{ordersLoading && (
						<div className="w-full h-[calc(100vh_-_228px)] flex justify-center items-center">
							<Spinner className="text-yellow-400" />
						</div>
					)}
					{!ordersLoading &&
						orders &&
						orders?.length > 0 &&
						orders.map(order => <Order key={order.id} order={order} />)}
				</div>
			</section>
		</main>
	);
}
