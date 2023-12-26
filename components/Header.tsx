'use client';

import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

import { useSelector } from '@/store';

export function Header() {
	const cart = useSelector(state => state.cart);
	const router = useRouter();
	const { data } = useSession();

	return (
		<header>
			<div className="flex flex-grow items-center gap-6 px-6 py-2 bg-amazon-blue-default">
				<div className="flex items-center flex-grow sm:flex-grow-0 mt-2">
					<Image
						alt=""
						className="object-contain cursor-pointer"
						height={40}
						src="https://links.papareact.com/f90"
						width={150}
						onClick={() => router.push('/')}
					/>
				</div>
				<div className="hidden sm:flex items-center flex-grow h-10 rounded-md transition-colors bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
					<input
						className="flex-grow flex-shrink h-full w-6 py-2 px-4 rounded-l-md focus:outline-none"
						type="text"
					/>
					<MagnifyingGlassIcon className="h-12 p-4" />
				</div>
				<div className="flex items-center gap-6 text-xs text-white whitespace-nowrap">
					{data && (
						<div className="link" onClick={() => signOut()}>
							<p className="font-extrabold md:text-sm">Sign Out</p>
						</div>
					)}
					<div className="link" onClick={!data ? () => signIn() : () => {}}>
						<p>{data ? `Hello, ${data.user?.name?.split(' ')[0]}` : 'Sign In'}</p>
						<p className="font-extrabold md:text-sm">Account & Lists</p>
					</div>
					<div className="link">
						<p>Returns</p>
						<p className="font-extrabold md:text-sm">& Orders</p>
					</div>
					<div className="relative flex items-center link" onClick={() => router.push('/checkout')}>
						<span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center text-black font-bold rounded-full">
							{cart.items.length}
						</span>
						<ShoppingCartIcon className="h-10" />
						<p className="hidden md:inline mt-2 font-extrabold md:text-sm">Cart</p>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-3 py-2 px-6 bg-amazon-blue-light text-white text-sm">
				<p className="link flex items-center">
					<Bars3Icon className="h-6 mr-1" />
					All
				</p>
				<p className="link">Prime Video</p>
				<p className="link">Amazon Business</p>
				<p className="link">Today&apos;s Deals</p>
				<p className="link hidden lg:inline-flex">Electronics</p>
				<p className="link hidden lg:inline-flex">Food & Grocery</p>
				<p className="link hidden lg:inline-flex">Prime</p>
				<p className="link hidden lg:inline-flex">Buy Again</p>
				<p className="link hidden lg:inline-flex">Shopper Toolkit</p>
				<p className="link hidden lg:inline-flex">Health & Personal Care</p>
			</div>
		</header>
	);
}
