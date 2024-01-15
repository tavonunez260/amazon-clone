import * as admin from 'firebase-admin';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

//Establish connection to Stripe

//Secure a connection to FIREBASE from the backend
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount)
		})
	: admin.app();

export const bodyParser = false;

const fulfillOrder = async (session: any) =>
	app
		.firestore()
		.collection('users')
		.doc(session.metadata.email)
		.collection('orders')
		.doc(session.id)
		.set({
			amount: session.amount_total / 100,
			amount_shipping: session.total_details.amount_shipping / 100,
			images: JSON.parse(session.metadata.images),
			timestamp: admin.firestore.FieldValue.serverTimestamp()
		})
		.then(() => {
			console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
		});

export async function POST(request: NextRequest) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
		apiVersion: '2023-10-16'
	});
	const signingSecret = process.env.STRIPE_SIGNING_SECRET ?? '';
	const signature = request.headers.get('stripe-signature') ?? '';
	// Read the request body as text
	const reqText = await request.text();
	// Convert the text to a buffer
	const reqBuffer = Buffer.from(reqText);

	let event;

	//Verify that the event posted came from stripe
	try {
		event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log('ERROR', error.message);
			return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
		}
	}

	//Handle the checkout.session.completed event
	if (event && event.type === 'checkout.session.completed') {
		const session = event.data.object;

		//Fulfill the order
		return fulfillOrder(session)
			.then(() => new NextResponse('Success', { status: 200 }))
			.catch((error: unknown) => {
				if (error instanceof Error) {
					new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
				}
			});
	}
	return NextResponse.json({ received: true });
}
