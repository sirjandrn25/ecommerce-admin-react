import Icon from "@Components/Icon/icon.component";
import { CloseIcon } from "@Constants/imageMapping.constants";
import ModalUtil from "@Utils/modal.utils";
import React from "react";

const ModalContainer = ({
  children,
  title = "",
  className = "",
  titleClassName = "",
  closeIcon = true,
}: any) => {
  return (
    <div className={`bg-base-100 relative ${className}`}>
      {!!title && (
        <div className={`p-4 bg-base-200  font-semibold ${titleClassName}`}>
          {title}
        </div>
      )}
      {closeIcon && (
        <div
          onClick={() => ModalUtil.close()}
          className="absolute p-2 border rounded-full cursor-pointer top-2 right-2 border-error active:bg-error/20"
        >
          <Icon source={CloseIcon} isReactIcon iconColor="text-error" />
        </div>
      )}
      {children}
    </div>
  );
};

export const ModalBody = ({ children, className = "" }: any) => {
  return <div className={`p-5   ${className}`}>{children}</div>;
};

export const ModalFooter = ({ children, className = "" }: any) => {
  return (
    <div
      className={`bg-base-200  p-4 flex items-center justify-end ${className}`}
    >
      {children}
    </div>
  );
};

export default ModalContainer;
