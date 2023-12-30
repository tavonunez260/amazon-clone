/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
		domains: [
			'links.papareact.com',
			'fakestoreapi.com',
			'images-na.ssl-images-amazon.com',
			'upload.wikimedia.org'
		]
	},
	env: {
		stripe_public_key: process.env.STRIPE_PUBLIC_KEY
	}
};

module.exports = nextConfig;
