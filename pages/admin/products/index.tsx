import React, { useEffect, useState } from "react";
import Button from "../../../src/Components/Button/button.component";
import SlidingPaneUtil from "../../../src/Utils/slidingPane.utils";
import InputField from "../../../src/Components/Input/inputField.component";

const Product = () => {
	const [title, setTitle] = useState("This is Title");
	useEffect(() => {
		SlidingPaneUtil.updateProps({ headingTitle: title });
	}, [title]);
	const DummyComponent = () => (
		<div>
			<InputField
				label="Debounce Field"
				onDebounceChange={(value) => console.log(value)}
			/>
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
			<InputField
				label="Debounce Field"
				onDebounce={(value) => console.log(value)}
			/>
		</div>
	);
};

export default Product;
