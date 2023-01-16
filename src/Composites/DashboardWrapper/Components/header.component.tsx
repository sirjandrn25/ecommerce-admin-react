import { useProSidebar } from "react-pro-sidebar";
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

					<li></li>
				</ul>
			</div>
		</div>
	);
};

export default Header;
