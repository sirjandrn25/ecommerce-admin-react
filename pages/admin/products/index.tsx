import React, { useEffect, useState } from "react";
import Button from "../../../src/Components/Button/button.component";
import SlidingPaneUtil from "../../../src/Utils/slidingPane.utils";

const Product = () => {
	const [title, setTitle] = useState("This is Title");
	useEffect(() => {
		SlidingPaneUtil.updateProps({ headingTitle: title });
	}, [title]);
	const DummyComponent = () => (
		<div>
			Dummy Product{" "}
			<Button
				onClick={() => {
					setTitle("Update The Title");
				}}
			>
				Update Title
			</Button>
			{/* <Button
				onClick={() => {
					SlidingPaneUtil.open({
						component: () => (
							<div>
								second slide{" "}
								<Button
									onClick={() => {
										SlidingPaneUtil.closeAll();
										// SlidingPane.open({
										// 	compnent:
										// })
									}}
								>
									Close All Sliding pane
								</Button>
							</div>
						),
						headingTitle: "Dummy product Open",
					});
					// SlidingPane.open({
					// 	compnent:
					// })
				}}
			>
				Open Sliding Pane
			</Button>{" "} */}
		</div>
	);
	return (
		<div>
			<div>Testing Sliding Pane</div>
			<div className="flex items-center gap-4">
				<Button
					onClick={() => {
						SlidingPaneUtil.open({
							component: DummyComponent,
							headingTitle: title,
							openFrom: "bottom",
						});
						// SlidingPane.open({
						// 	compnent:
						// })
					}}
				>
					Open Sliding Pane
				</Button>
				<Button className="btn-error">Close Sliding Pane</Button>
			</div>
		</div>
	);
};

export default Product;
