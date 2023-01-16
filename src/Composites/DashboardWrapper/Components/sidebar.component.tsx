import {
	Menu,
	MenuItem,
	Sidebar,
	SubMenu,
	useProSidebar,
} from "react-pro-sidebar";
import * as IconUtils from "../../../Constants/imageMapping.constants";
import Icon from "../../../Components/Icon/icon.component";

interface MenuBaseItemIterface {
	name: string;

	action?: () => void;
	icon: any;
	url?: string;
}

interface SubMenuIterface {
	label: string;

	icon: any;
	menus: MenuBaseItemIterface[];
}
interface MenuItemIterface extends MenuBaseItemIterface {
	sub_menu?: SubMenuIterface;
}

interface SidebarInterface {
	menus: MenuItemIterface[];
}
const menus: MenuItemIterface[] = [
	{
		name: "Dashboard",
		icon: IconUtils.DashboardIcon,

		url: "dashboard",
	},

	{
		name: "Users",
		icon: IconUtils.UserIcon,

		url: "users",
	},

	{
		name: "Products",
		//   border: false,
		icon: IconUtils.ProductIcon,

		url: "products",
	},

	{
		name: "Settings",
		icon: IconUtils.SearchIcon,
	},
];

const CustomSidebar = () => {
	const { collapsed } = useProSidebar();

	const renderMenuItem = (menu: MenuItemIterface, index: number) => {
		if (menu.sub_menu) return renderSubMenu(menu.sub_menu);
		const MenuIcon = menu?.icon || <></>;
		return (
			<MenuItem
				onClick={() => {
					if (menu.action) {
						menu.action();
						return;
					}
					if (menu.url) {
						//navigation logic write
						return;
					}
				}}
				icon={<MenuIcon />}
				key={menu.url || index}
			>
				{menu.name}
			</MenuItem>
		);
	};
	const renderSubMenu = (sub_menu: SubMenuIterface) => {
		const { label, menus = [], icon: MenuIcon = <></> } = sub_menu;
		return (
			<SubMenu label={label} icon={<MenuIcon />}>
				{menus.map((menu: MenuBaseItemIterface, index: number) => {
					return renderMenuItem(menu, index);
				})}
			</SubMenu>
		);
	};
	return (
		<Sidebar className="h-full">
			<Menu>
				<MenuItem
					className="border-b py-[7px]"
					icon={<Icon source={IconUtils.DashboardIcon} isReactIcon />}
				>
					{!collapsed && <div className="text-xl">Fashion Shop</div>}
				</MenuItem>
				{(menus || []).map((menu: MenuItemIterface, index: number) => {
					return renderMenuItem(menu, index);
				})}
			</Menu>
		</Sidebar>
	);
};

export default CustomSidebar;
