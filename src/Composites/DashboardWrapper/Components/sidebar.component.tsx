import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

import Icon from "@Components/Icon/icon.component";
import {
  DashboardIcon,
  DollorIcon,
  PercentageIcon,
  ProductIcon,
  SettingIcon,
  UsersIcon,
} from "@Constants/imageMapping.constants";
import useNavigation from "@Hooks/useNavigation.hook";
import { resolveNavigation } from "@Utils/common.utils";

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

const menus: MenuItemIterface[] = [
  {
    name: "Orders",
    icon: DollorIcon,

    url: "orders",
  },
  {
    name: "Products",
    //   border: false,
    icon: ProductIcon,

    url: "products",
  },

  {
    name: "Customers",
    icon: UsersIcon,

    url: "customers",
  },
  {
    name: "Discount",
    icon: PercentageIcon,

    url: "discounts",
  },

  {
    name: "Settings",
    icon: SettingIcon,
  },
];

const CustomSidebar = () => {
  const { collapsed } = useProSidebar();
  const { navigation, query, pathname } = useNavigation();

  const renderMenuItem = (menu: MenuItemIterface, index: number) => {
    if (menu.sub_menu) return renderSubMenu(menu.sub_menu);
    const MenuIcon = menu?.icon || <></>;
    return (
      <MenuItem
        onClick={(e) => {
          if (menu.action) {
            menu.action();
            return;
          }
          if (menu.url) {
            e.preventDefault();

            navigation({ pathname: resolveNavigation(menu.url) });
            return;
          }
        }}
        icon={<MenuIcon size={20} />}
        key={menu.url || index}
        active={resolveNavigation(menu?.url || "/") === pathname}
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
    <Sidebar className="min-h-screen !border-r-0  ">
      <Menu>
        <MenuItem
          className="border-b border-base-200 py-[7px] "
          icon={<Icon source={DashboardIcon} size={25} />}
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
