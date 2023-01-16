import React, { useState } from "react";
import SlidingPanel from "react-sliding-side-panel";

const CustomSlidingPane = () => {
	const [openPanel, setOpenPanel] = useState(true);
	console.log({ openPanel });
	return (
		<SlidingPanel type={"right"} isOpen={openPanel} size={40}>
			<div className="bg-base-300">
				<div>My Panel Content</div>
				<button onClick={() => setOpenPanel(false)}>close</button>
			</div>
		</SlidingPanel>
	);
};

export default CustomSlidingPane;
