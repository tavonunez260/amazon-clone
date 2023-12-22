'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export function Banner() {
	return (
		<div className="relative">
			<div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
			<Carousel
				autoPlay
				infiniteLoop
				interval={5000}
				showIndicators={false}
				showStatus={false}
				showThumbs={false}
			>
				<div>
					<img alt="banner1" loading="lazy" src="https://links.papareact.com/gi1" />
				</div>
				<div>
					<img alt="banner1" loading="lazy" src="https://links.papareact.com/6ff" />
				</div>
				<div>
					<img alt="banner1" loading="lazy" src="https://links.papareact.com/7ma" />
				</div>
			</Carousel>
		</div>
	);
}
