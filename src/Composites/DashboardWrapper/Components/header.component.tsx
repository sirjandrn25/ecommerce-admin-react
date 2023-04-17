import Icon from "@Components/Icon/icon.component";
import { ToggleIcon } from "@Constants/imageMapping.constants";
import { useProSidebar } from "react-pro-sidebar";
import { useTheme } from "src/Context/useTheme.context";
import { useSignOut } from "react-auth-kit";
import Button from "@Components/Button/button.component";

const Header = () => {
  const { collapseSidebar } = useProSidebar();
  const signOut = useSignOut();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="shadow-lg navbar bg-base-100 ">
      <div className="flex flex-1 gap-4 px-4">
        <Icon
          onClick={() => collapseSidebar()}
          source={ToggleIcon}
          isReactIcon
        />
        <input
          type="checkbox"
          className="toggle"
          onChange={(e: any) => {
            toggleTheme();
          }}
          checked={theme === "dark"}
        />
      </div>
      <Button size="sm" outline onClick={signOut}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
