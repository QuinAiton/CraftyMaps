import React from 'react';
import useStore from '../../../hooks/store';
export default function getDirections() {
	const { routes, setDirections }: any = useStore();

	const flattenDirections = routes?.trips[0]?.legs;
	let steps: string[] = [];
	flattenDirections.forEach((leg: { steps: any }) => {
		steps = [...steps, ...leg?.steps];
	});
	setDirections(steps);
}
