import { useEffect } from 'react';
import Head from 'next/head';
import '../Styles/index.css';
import useSetBreweries from '../hooks/useSetBreweries';

export default function MyApp({ Component, pageProps }) {
	useSetBreweries();
	return (
		<div>
			<Head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Crafty Maps</title>
			</Head>
			<Component {...pageProps} />
		</div>
	);
}
