import useNavigation from "@Hooks/useNavigation.hook";
import { GetObjectFromArray, IsUniqueArrayObject } from "@Utils/common.utils";
import { useState } from "react";
import { useEffectOnce, useUpdateEffect } from "react-use";

export interface TabItemInterface {
  name: string;
  key: string | number;
  component: any;
  visible?: boolean;
}

export interface TabInterface {
  tabs: TabItemInterface[];
  className?: string;
  tabHeaderClassName?: string;
  tabContentClassName?: string;
  isNavigation?: boolean;
  navigation_key?: string;
  defaultActiveTab?: string | number;
}

const Tabs = ({
  tabs = [],
  isNavigation = true,
  navigation_key = "tabs",
  tabContentClassName = "",
  tabHeaderClassName = "",
  defaultActiveTab,
  className = "",
}: TabInterface) => {
  const [active, setActive] = useState<string | number>(defaultActiveTab || 0);
  const [isActiveKey, setIsActiveKey] = useState<boolean>(false);
  const { navigation, pathname, query } = useNavigation();
  const handleNavigation = (activeTab: string | number) => {
    if (!isNavigation) return;
    navigation({
      pathname: pathname,
      queryParams: {
        [navigation_key]: activeTab,
      },
    });
  };

  useEffectOnce(() => {
    const isUniqueTabsKey = IsUniqueArrayObject(tabs, "key");

    if (isUniqueTabsKey) {
      setIsActiveKey(true);
    }
    if (defaultActiveTab) return;

    // decide active tab is key or index in navigation case
    let tabParam: any = query[navigation_key];
    if (isNavigation && tabParam) {
      if (!isUniqueTabsKey) tabParam = Number(tabParam);
      setActive(tabParam);
      return;
    }

    // decide active tab is key or index in normal case
    if (isUniqueTabsKey) {
      setActive(tabs[0]?.key);
    } else {
      setActive(0);
    }
  });
  useUpdateEffect(() => handleNavigation(active), [active]);
  useEffectOnce(() => {
    //for default navigation
    if (defaultActiveTab) handleNavigation(defaultActiveTab);
  });

  const storeActiveTabKey = (key: string | number, index: number) => {
    if (isActiveKey) {
      setActive(key);
    } else setActive(index);
  };

  const checkActiveTab = (key: string | number, index: number) => {
    if (isActiveKey) return key === active;
    return index === active;
  };

  const TabItem = ({ item, index }: any) => {
    return (
      <a
        className={`tab  tab-bordered  ${
          checkActiveTab(item?.key, index)
            ? "tab-active !border-info"
            : "border-white"
        }`}
        onClick={() => storeActiveTabKey(item?.key, index)}
      >
        {item?.name}
      </a>
    );
  };

  const renderActiveTabContent = () => {
    if (isActiveKey) {
      const obj = GetObjectFromArray(tabs, "key", active);
      return obj?.component;
    }
    return tabs[active as number]?.component;
  };

  const renderTab = () => {
    return tabs.map((tab, index) => (
      <TabItem key={tab?.key || index} {...{ item: tab, index }} />
    ));
  };

  return (
    <div className={`w-full h-full gap-4 col-flex bg-base-200 ${className}`}>
      <div
        className={`tabs bg-base-100 border-b-2  w-full ${tabHeaderClassName}`}
      >
        {renderTab()}
      </div>
      <div className={`w-full h-full p-4 rounded ${tabContentClassName}`}>
        {renderActiveTabContent()}
      </div>
    </div>
  );
};

export default Tabs;
