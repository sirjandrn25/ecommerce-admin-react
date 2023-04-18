import React from "react";

interface CollapsableInterface {
  title: string;
  subTitle?: string;
  children?: any;
  className?: string;
  contentClassName?: string;
}

const Collapsable = ({
  title,
  subTitle,
  children,
  contentClassName = "",
  className = "",
}: CollapsableInterface) => {
  return (
    <div
      tabIndex={0}
      className={`border rounded collapse collapse-plus border-base-300 bg-base-100 ${className}`}
    >
      <div className=" col-flex">
        <div className="text-xl font-medium collapse-title">{title}</div>
      </div>

      <div className={`collapse-content ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default Collapsable;
