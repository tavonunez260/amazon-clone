'use client';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

import { Header } from '@/components';

export default function Success() {
	const router = useRouter();
	return (
		<main className="bg-gray-100 h-screen">
			<Header />
			<section className="max-w-screen-lg mx-auto">
				<div className="flex flex-col p-10 mt-10 bg-white">
					<div className="flex items-center gap-2 mb-5">
						<CheckCircleIcon className="text-green-500 h-10" />
						<h1 className="text-3xl font-semibold">Thank you, your order has been confirmed.</h1>
					</div>
					<p className="mt-5">
						Thank you for shopping with us. We&apos;ll send a confirmation once your item has
						shipped. If you would like to check the status of your order(s), please press the link
						below.
					</p>
					<button className="button mt-8" onClick={() => router.push('/orders')}>
						Go to my orders
					</button>
				</div>
			</section>
		</main>
	);
}
