import Button from "@Components/Button/button.component";
import Icon from "@Components/Icon/icon.component";
import { AvatarUser, CartIcon } from "@Constants/imageMapping.constants";

const Navigation = () => {
  return (
    <div className="justify-between gap-4 p-4 px-6 shadow row-flex bg-base-100">
      <div>Logo</div>
      <div className="items-center gap-4 row-flex">
        <Icon source={AvatarUser} />
        <Icon source={CartIcon} />
        <Button size="sm" outline>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
