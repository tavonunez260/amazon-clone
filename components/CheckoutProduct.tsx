import { MinusIcon, PlusIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import { ProductType } from '@/types';
import { copFormatter } from '@/utils';

interface CheckoutProductProps {
	handleAddItemToCart: (product: ProductType) => void;
	handleRemoveItemFromCart: (id: number, action: 'delete' | 'decrement') => void;
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
				<p className="font-bold">{product.title}</p>
				<div className="flex">
					{Array(product.rating)
						.fill(null)
						.map((_, i) => (
							<StarIcon key={i} className="h-5 text-yellow-500" />
						))}
				</div>
				<p className="text-xs my-2 line-clamp-3">{product.description}</p>
				<div className="mb-5 flex flex-col gap-2">
					<p>{copFormatter.format(product.price)}</p>
					<p className="text-lg">Total {copFormatter.format(product.price * product.count)}</p>
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
				<div className="flex justify-between items-center">
					<button
						className="button"
						disabled={product.count === 1}
						onClick={() => handleRemoveItemFromCart(product.id, 'decrement')}
					>
						<MinusIcon className="w-5 h-5 text-yellow-800" />
					</button>
					<p>{product.count}</p>

					<button className="button" onClick={() => handleAddItemToCart(product)}>
						<PlusIcon className="w-5 h-5 text-yellow-800" />
					</button>
				</div>
				<button className="button" onClick={() => handleRemoveItemFromCart(product.id, 'delete')}>
					Remove from cart
				</button>
			</div>
		</div>
	);
}
