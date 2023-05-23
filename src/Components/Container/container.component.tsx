import React from "react";

const Container = ({ children, className = `` }: any) => {
  return (
    <div
      className={`row-flex justify-center flex-1 p-6 px-5 md:px-5 lg:px-5 xl:px-10 xxl:px-20 ${className}`}
    >
      {children}
    </div>
  );
};

export const ContainerBody = ({ children }: any) => {
  return <div className="w-full h-full bg-base-100">{children}</div>;
};

export default Container;
