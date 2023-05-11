import React from "react";

const Card = ({ className, children, title }: any) => {
  const Header = () => {
    return <div className="text-lg font-semibold">{title}</div>;
  };

  return (
    <div className={`rounded shadow bg-base-100 p-4 ${className}`}>
      {title && <Header />}
      {children}
    </div>
  );
};

export default Card;
