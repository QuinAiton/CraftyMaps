module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		colors: {
			blue: '#1fb6ff',
			purple: '#7e5bef',
			pink: '#ff49db',
			orange: '#ff7849',
			green: '#13ce66',
			yellow: '#ffc82c',
			'gray-dark': '#273444',
			gray: '#8492a6',
			'gray-light': '#d3dce6',
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {
			spacing: {
				128: '32rem',
				144: '36rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
			fontFamily: {
				bitter: ['Bitter', 'sans-serif'],
			},
			colors: {
				customPurple: '#523d9e',
				customWhite: '#f6f6f4',
				palePurple: '#877fa3',
			},
			typography: {
				'3xl': {
					css: {
						fontSize: '1.875rem',
						h1: {
							fontSize: '4rem',
							fontFamily: ['Bitter', 'sans-serif'],
						},
						p: {
							fontSize: '1.5rem',
							fontFamily: ['Bitter', 'sans-serif'],
						},
						button: {
							fontFamily: ['Bitter', 'sans-serif'],
						},
					},
				},
			},
		},
	},
};