/* eslint-disable @next/next/no-img-element */
import { useMemo } from "react";

export interface AvatarInterface {
  size?: "xs" | "sm" | "md" | "lg";
  shape?: "circle" | "square";
  image?: string;
  placeholder?: string;
}

const Avatar = ({
  size,
  shape = "square",
  placeholder = "P",
  image = "",
}: AvatarInterface) => {
  const avatarSize = useMemo(() => {
    switch (size) {
      case "xs":
        return "w-8 h-8";
      case "sm":
        return `w-12 h-12`;
      case "md":
        return `w-16 h-16`;
      case "lg":
        return "w-20 h-20";
      default:
        return `w-16 h-16`;
    }
  }, [size]);
  const avartarShape = useMemo(() => {
    switch (shape) {
      case "circle":
        return `rounded-full`;
      default:
        return "rounded";
    }
  }, [shape]);
  return (
    <div className={`avatar ${image ? "" : "placeholder"}`}>
      <div
        className={`${avatarSize} ${avartarShape} ${
          image ? "" : "bg-base-200"
        }`}
      >
        {!!image && <img src={image} alt={placeholder} />}
        {!image && <span className="text-lg">{placeholder}</span>}
      </div>
    </div>
  );
};

export default Avatar;
