import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MapAnimation from '../components/shared/MapAnimation';
import Loading from '../components/shared/Loading';
import { useState } from 'react';
export default function index() {
	const router = useRouter();
	const [showLoading, setShowLoading] = useState(false);
	const homeRouteHandler = () => {
		setShowLoading(true);
		setTimeout(() => {
			router.push('/map');
		}, 200);
	};
	return (
		<>
			{showLoading && <Loading />}
			<div className="container grid grid-rows-3 w-screen h-screen bg-white">
				<div className="w-full text-center p-5 row-span-1  flex flex-col justify-center items-center">
					<h1 className="text-6xl text-customPurple font-bitter font-bold ">Crafty Maps</h1>
					<h4 className="text-xl text-customPurple font-bitter font-semibold">Your Adventure Starts here.</h4>
				</div>
				<div className="bg-customPurple h-full row-span-2 rounded-t-[75px] flex flex-col justify-evenly">
					<div>
						<MapAnimation />
					</div>
					<div className="flex flex-col justify-center items-center gap-3">
						{/* <Link className="w-full flex justify-center items-center" href="/map"> */}
						<button className="ghostButtonPrimary w-2/3 mx-auto" onClick={() => homeRouteHandler()}>
							Explore
						</button>

						{/* </Link> */}
						<Link className="w-full flex justify-center items-center" href="#">
							<button className="primaryButton border border-white w-2/3 mx-auto">Sign-in</button>
						</Link>
						<Link className="w-full flex justify-center items-center" href="#">
							<button className="primaryButton border border-white w-2/3 mx-auto"> Register</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
