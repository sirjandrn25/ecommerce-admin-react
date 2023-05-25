import React from "react";
import Navigation from "./Components/navigation.component";

const StoreFrontDashboard = ({ children }: any) => {
  return (
    <div className="h-screen-content col-flex ">
      <Navigation />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default StoreFrontDashboard;
