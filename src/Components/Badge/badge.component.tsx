import Icon from "@Components/Icon/icon.component";

import clsx from "clsx";

interface BadgeInterface {
  label: string;
  appearance:
    | "error"
    | "warning"
    | "primary"
    | "success"
    | "info"
    | "base"
    | "secondary";
  size?: "xs" | "sm" | "md" | "base";
  className?: string;
  rightIconClassName?: string;
  lefticon?: any;
  rightIcon?: any;
  onRightIconClick?: () => void;
  onClick?: () => void;
  solid?: boolean;
}

const Badge = ({
  label,
  size = "md",
  appearance = "base",
  className = "",
  rightIconClassName = "",
  lefticon,
  rightIcon,
  onRightIconClick,
  onClick,
  solid,
}: BadgeInterface) => {
  const statusColorSolid = {
    error: "badge-error bg-error text-white",
    warning: " badge-warning bg-warning text-white",
    primary: " badge-primary bg-primary text-white",
    success: " badge-success bg-success text-white",
    info: " badge-info bg-info text-white",
    base: " bg-[#A8B2C1] text-white",
    secondary: " bg-secondary text-white",
  };
  const statusColor = {
    error: "badge-error bg-error/10 text-error",
    warning: " badge-warning bg-warning/10 text-warning",
    primary: " badge-primary bg-primary/10 text-primary",
    success: " badge-success bg-success/10 text-success",
    info: " badge-info bg-info/10 text-info",
    base: " bg-[#A8B2C11A] text-color-tertiary",
    secondary: " bg-secondary/10 text-secondary",
  };

  const sizeClass = {
    xs: " text-[10px] h-5 !px-1 font-normal ",
    sm: " text-[10px]",
    base: "text-xs h-6",
    md: "text-xs h-8",
  };

  const defaultClassName =
    "badge py-3 px-4 font-medium border-0 text-center inline-inline rounded cursor-default  gap-3 items-center";

  return (
    <div
      className={clsx(
        className,
        defaultClassName,
        sizeClass[size],
        solid ? statusColorSolid[appearance] : statusColor[appearance]
      )}
      onClick={onClick}
    >
      {lefticon && <Icon source={lefticon} size={16} isSvg />}
      {label}
      {rightIcon && (
        <Icon
          className={rightIconClassName}
          source={rightIcon}
          size={12}
          isSvg
          onClick={onRightIconClick}
        />
      )}
    </div>
  );
};

export default Badge;
