import ky from 'ky';

import { Banner, Header, ProductFeed } from '@/components';
import { ProductResponse } from '@/types';

const getProducts = async () =>
	await ky.get('https://fakestoreapi.com/products').json<ProductResponse[]>();

export default async function Home() {
	const products = await getProducts();
	return (
		<main className="bg-gray-100">
			<Header />
			<section className="max-w-screen-2xl mx-auto">
				<Banner />
				<ProductFeed products={products} />
			</section>
		</main>
	);
}
