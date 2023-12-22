/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	images: {
		unoptimized: true,
		domains: [
			'links.papareact.com',
			'fakestoreapi.com',
			'images-na.ssl-images-amazon.com',
			'upload.wikimedia.org'
		]
	}
};

module.exports = nextConfig;
