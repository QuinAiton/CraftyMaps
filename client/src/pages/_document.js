import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="utf-8" />
				<meta name="theme-color" content="#000000" />
				<meta name="author" content="Quinten Aiton" />
				<meta name="description" content="Website that allows you to view local breweries and plan routes" />
				<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
				<script src="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js"></script>
				<link href="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css" rel="stylesheet" />
				{/* <!-- Tailwind css font --> */}
				{/* <!-- <link href="/dist/output.css" rel="stylesheet" > --> */}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
