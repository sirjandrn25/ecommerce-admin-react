import React, { ReactNode, useState } from "react";
import ReactSlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { EmptyFunction } from "../../Utils/common.utils";

interface SlidingPaneInterface {
	isVisible?: boolean;
	headingTitle?: string;
	headingSubTitle?: string;
	size?: number;
	children: ReactNode;
	className?: string;
	closePane?: (data?: any) => void;
}

const SlidingPane = ({
	children,
	isVisible,
	headingSubTitle,
	headingTitle,
	size = 300,
	className = "",
	closePane = EmptyFunction,
	...rest
}: SlidingPaneInterface) => {
	const width = `${size}px`;

	const handleClosePane = () => {
		closePane();
	};

	return (
		<ReactSlidingPane
			onRequestClose={handleClosePane}
			// closeIcon={<div>Some div containing custom close icon.</div>}
			from={"right"}
			isOpen={isVisible}
			width={width}
			title={headingTitle}
			subtitle={headingSubTitle}
			className={`p-0 ${className}`}

			// hideHeader={true}
		>
			{children}
		</ReactSlidingPane>
	);
};

export default SlidingPane;
