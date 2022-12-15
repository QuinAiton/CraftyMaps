import React, { ReactNode } from 'react';

type PropTypes = {
	onClick?: () => void;
	icon?: ReactNode;
	classNames?: string;
	disabled?: boolean;
};
export default function CustomRoundButton({ onClick, icon, classNames, disabled }: PropTypes) {
	return (
		<button
			className={`flex justify-center items-center p-2 bg-customPurple w-14 h-14 rounded-full ...${classNames}`}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
		</button>
	);
}
