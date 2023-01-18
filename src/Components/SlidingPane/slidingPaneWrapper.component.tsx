import React, { Component, useState } from "react";
import SlidingPane from "./slidingPane.component";

interface SlidingPaneWrapperInterface {
	component: (props: any) => React.ReactElement;
	headingTitle?: string;
	headingSubTitle?: string;
	props?: any;
	size?: number;
}

// eslint-disable-next-line react/display-name
const SlidingPaneWrapper = React.forwardRef((props, _ref) => {
	const [modals, setModals] = useState<any>([]);

	const close = (close_index: number = modals.length - 1) => {
		const modal_list = [...modals];
		modal_list.splice(close_index, 1);
		setModals(modal_list);
	};

	const open = ({
		component,
		props = {},
		...rest
	}: SlidingPaneWrapperInterface) => {
		const sheet = {
			props,
			component,
			isVisible: true,
			...rest,
			close,
		};
		setModals([...modals, sheet]);
	};

	const EmptyComponent = () => {
		return <></>;
	};

	const renderModals = () => {
		return (modals || []).map((sheet: any, index: number) => {
			console.log({ sheet });
			const Component = sheet?.component || EmptyComponent;
			return (
				<SlidingPane {...sheet} key={index}>
					<Component {...sheet.props} />
				</SlidingPane>
			);
		});
	};

	return renderModals();
});

export default SlidingPaneWrapper;
