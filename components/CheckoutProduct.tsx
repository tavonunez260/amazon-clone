import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import { ProductType } from '@/types';
import { copFormatter } from '@/utils';

interface CheckoutProductProps {
	handleAddItemToCart: (product: ProductType) => void;
	handleRemoveItemFromCart: (id: number) => void;
	product: ProductType;
}

export function CheckoutProduct({
	handleAddItemToCart,
	handleRemoveItemFromCart,
	product
}: CheckoutProductProps) {
	return (
		<div className="grid grid-cols-5">
			<Image
				alt={product.title}
				className="w-52 h-52 object-contain"
				height={192}
				src={product.image}
				width={192}
			/>
			<div className="col-span-3">
				<p>{product.title}</p>
				<div className="flex">
					{Array(product.rating)
						.fill(null)
						.map((_, i) => (
							<StarIcon key={i} className="h-5 text-yellow-500" />
						))}
				</div>
				<p className="text-xs my-2 line-clamp-3">{product.description}</p>
				<div className="mb-5">
					<p>{copFormatter.format(product.price)}</p>
				</div>
				{product.hasPrime && (
					<div className="flex items-center gap-2">
						<img
							alt="prime"
							className="w-12 h-12 object-contain"
							loading="lazy"
							src="https://images-na.ssl-images-amazon.com/images/G/01/dex/2022/Delivery_Choices/091222_DEX_PrimeAmazonDay_LP_Steps_1_Desktop_600x220.jpg"
						/>
						<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
					</div>
				)}
			</div>
			<div className="flex flex-col gap-2 my-auto justify-self-end">
				<button className="button" onClick={() => handleAddItemToCart(product)}>
					Add to cart
				</button>
				<button className="button" onClick={() => handleRemoveItemFromCart(product.id)}>
					Remove from cart
				</button>
			</div>
		</div>
	);
}
