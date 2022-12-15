type propTypes = {
	key: string;
	id: string;
	name: string;
	icon: string;
	location: string;
	category: string;
	coordinates: [number, number];
	isRouted: boolean;
	addRouteHandler: (id: string) => void;
	removeRouteHandler: (id: string) => void;
	onSelectBrewery: (lng: number, lat: number) => void;
};
const CardItem = ({
	name,
	location,
	category,
	id,
	// icon,
	isRouted,
	coordinates,
	addRouteHandler,
	removeRouteHandler,
	onSelectBrewery,
}: propTypes) => {
	return (
		<div
			className="w-full rounded-xl bg-customWhite flex flex-col gap-1 mb-2 p-5"
			onClick={() => onSelectBrewery(...coordinates)}
		>
			<div>{/* <Image src={icon} alt="breweryIcon" width={500} height={500} /> */}</div>
			<h4>{name}</h4>
			<p className="text-sm font-bitter">{category}</p>
			<p className="text-sm font-bitter">{location}</p>
			<button
				className={`mx-auto mt-2 w-1/2 px-5 py-2 font-bitter font-bold text-[10px] uppercase transition-colors rounded-lg ${
					isRouted
						? 'text-customPurple bg-customWhite border border-customPurple'
						: ' bg-customPurple  text-customWhite'
				}`}
				onClick={() => (isRouted ? removeRouteHandler(id) : addRouteHandler(id))}
			>
				{isRouted ? 'Remove from Route' : 'Add to Route'}
			</button>
		</div>
	);
};

export default CardItem;
