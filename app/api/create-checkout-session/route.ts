import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { ProductType } from '@/types';
import { allowedCountries, transformedItems } from '@/utils';

export async function POST(request: NextRequest) {
	const stripe = new Stripe(process.env.stripe_secret_key as string, {
		apiVersion: '2023-10-16'
	});

	const res: { email: string; items: ProductType[] } = await request.json();
	const { email, items } = res;
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		shipping_options: [{ shipping_rate: 'shr_1OYhcsCDnmLkgQFbzWswKH60' }],
		shipping_address_collection: {
			allowed_countries: allowedCountries
		},
		line_items: transformedItems(items),
		mode: 'payment',
		success_url: `${process.env.HOST}/success`,
		cancel_url: `${process.env.HOST}/checkout`,
		metadata: {
			email,
			images: JSON.stringify(items.map(item => item.image))
		}
	});

	return NextResponse.json({ id: session.id, message: 'Operation successful' }, { status: 200 });
}
