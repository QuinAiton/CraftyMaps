import React from 'react';
import 'antd/dist/reset.css';
import Loading from '../components/shared/Loading';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MspAnimation from '../components/shared/MapAnimation';
import MapAnimation from '../components/shared/MapAnimation';
export default function index() {
	const router = useRouter();
	setTimeout(() => {
		router.push;
	}, 1000);
	return (
		<div className="container grid grid-rows-3 w-screen h-screen bg-white">
			<div className="w-full text-center p-5 row-span-1  flex flex-col justify-center items-center">
				<h1 className="text-6xl text-customPurple font-bitter font-bold ">Crafty Maps</h1>
				<h4 className="text-xl text-customPurple font-bitter font-semibold">Your Adventure Starts here.</h4>
			</div>
			<div>
				<MapAnimation />
			</div>
			<div className="flex flex-col justify-center items-center gap-3">
				<button className="primaryButton hover:ghostButtonPrimary hover:bg-white transition-colors w-2/3 mx-auto">
					Explore
				</button>
				<button className="ghostButtonPrimary w-2/3 mx-auto">Sign-in</button>
				<button className="ghostButtonPrimary w-2/3 mx-auto">Register</button>
			</div>
		</div>
		// <Loading />
	);
}
