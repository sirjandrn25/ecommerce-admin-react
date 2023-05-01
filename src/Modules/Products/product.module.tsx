import Container from "@Components/Container/container.component";
import Tabs, { TabInterface } from "@Components/Tabs/tabs.component";

const ProductModule = () => {
  const tab_props: TabInterface = {
    tabs: [
      {
        name: "Tab 1",
        key: "key1",
        component: <div className="bg-base-100">TAb one </div>,
      },
      {
        name: "Tab 2",
        key: "key2",
        component: <div>Tab two </div>,
      },
      {
        name: "Tab 3",
        key: "key3",
        component: <div>TAb three </div>,
      },
    ],
    tabContentClassName: "bg-base-100",
    defaultActiveTab: "key3",
  };
  return (
    <Container>
      <Tabs {...tab_props} />
    </Container>
  );
};

export default ProductModule;
