import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import Button from "../../../Components/Button/button.component";
import Icon from "../../../Components/Icon/icon.component";
import { ToggleIcon } from "../../../Constants/imageMapping.constants";

const Header = () => {
	const { collapseSidebar } = useProSidebar();
	return (
		<div className="navbar bg-base-100 border-b">
			<div className="flex-1 px-4">
				<Icon
					onClick={() => collapseSidebar()}
					source={ToggleIcon}
					isReactIcon
				/>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a>Item 1</a>
					</li>
					<li tabIndex={0}>
						<a>
							Parent
							<svg
								className="fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
							>
								<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
							</svg>
						</a>
						<ul className="p-2 bg-base-100">
							<li>
								<a>Submenu 1</a>
							</li>
							<li>
								<a>Submenu 2</a>
							</li>
						</ul>
					</li>
					<li>
						<a>Item 3</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Header;
