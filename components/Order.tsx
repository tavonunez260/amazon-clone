import moment from 'moment';

import { OrderType } from '@/types';
import { usdFormatter } from '@/utils';

interface OrderProps {
	order: OrderType;
}

export function Order({ order }: OrderProps) {
	return (
		<div className="relative border rounded-md">
			<div className="flex items-center gap-10 p-5 bg-gray-200 text-sm text-gray-600">
				<div>
					<p className="font-bold">ORDER PLACED</p>
					<p>{moment.unix(order.timestamp).format('DD MMM YYYY')}</p>
				</div>
				<div>
					<p className="font-bold">TOTAL</p>
					<p>
						{usdFormatter.format(order.amount)} - Next Day Delivery -{' '}
						{usdFormatter.format(order.amountShipping)}
					</p>
				</div>
				<p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
					{order.items.length} items
				</p>
				<p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
					ORDER #{order.id}
				</p>
			</div>
			<div className="p-5 sm:p-10 bg-white">
				<div className="flex gap-6 overflow-x-auto">
					{order.images.map(image => (
						<img key={image} alt={image} className="h-20 object-contain sm:h-32" src={image} />
					))}
				</div>
			</div>
		</div>
	);
}
