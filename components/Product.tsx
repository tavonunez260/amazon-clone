'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ProductResponse } from '@/types';

interface ProductProps {
	product: ProductResponse;
}

const MAX_RATING = 5;
const MIN_RATING = 1;

export function Product({ product }: ProductProps) {
	const [rating, setRating] = useState(1);
	const [hasPrime, setHasPrime] = useState(true);
	const copFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'code' // Output will use the currency code
	});

	useEffect(() => {
		setRating(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
		setHasPrime(Math.random() < 0.5);
	}, []);

	return (
		<div className="relative z-30 flex flex-col p-10 bg-white">
			<p className="absolute top-2 right-2 text-xs italic text-gray-400">{product.category}</p>
			<Image
				alt={product.title}
				className="w-40 h-40 object-contain self-center"
				height={200}
				src={product.image}
				width={200}
			/>
			<h4 className="my-3">{product.title}</h4>
			<div className="flex">
				{Array(rating)
					.fill(null)
					.map((_, i) => (
						<StarIcon key={i} className="h-5" />
					))}
			</div>
			<p className="text-xs my-2 line-clamp-2">{product.description}</p>
			<div className="mb-5">
				<p>{copFormatter.format(product.price)}</p>
			</div>
			{hasPrime && (
				<div className="flex items-center gap-2 -mt-5">
					<img
						alt="prime"
						className="w-12 h-12 object-contain"
						src="https://images-na.ssl-images-amazon.com/images/G/01/dex/2022/Delivery_Choices/091222_DEX_PrimeAmazonDay_LP_Steps_1_Desktop_600x220.jpg"
					/>
					<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
				</div>
			)}
			<button className="button mt-auto">Add to basket</button>
		</div>
	);
}
