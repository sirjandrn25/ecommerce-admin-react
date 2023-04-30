import React, { useState } from "react";

const Tabs = () => {
  const [active, setActive] = useState(0);
  const tabs = [
    {
      title: "Tab 1",
      key: "key1",
    },
    {
      title: "Tab 2",
      key: "key2",
    },
    {
      title: "Tab 3",
      key: "key3",
    },
  ];

  const TabItem = ({ item, index }: any) => {
    return (
      <a
        className={`tab tab-bordered  ${
          item?.key === active || index === active
            ? "tab-active !border-info"
            : ""
        }`}
        onClick={() => setActive(item?.key || index)}
      >
        {item?.title}
      </a>
    );
  };

  const renderTab = () => {
    return tabs.map((tab, index) => (
      <TabItem key={tab?.key || index} {...{ item: tab, index }} />
    ));
  };

  return <div className="tabs">{renderTab()}</div>;
};

export default Tabs;
