import Container from "@Components/Container/container.component";
import Tabs, { TabInterface } from "@Components/Tabs/tabs.component";
import GeneralInformation from "./Components/generalInformation.componen";
import ProductVariant from "./Components/productVariant.component";
import { useRef } from "react";
import Button from "@Components/Button/button.component";
import { current } from "@reduxjs/toolkit";

const ProductModule = () => {
  const generalRef = useRef<any>(null);
  const tab_props: TabInterface = {
    tabs: [
      {
        name: "General",
        key: "general",
        component: <GeneralInformation ref={generalRef} />,
      },
      {
        name: "Variantion",
        key: "variantion",
        component: <ProductVariant />,
      },
      {
        name: "Shipping",
        key: "shipping",
        component: <div>Shipping </div>,
      },
    ],
    tabContentClassName: "!p-0",
    tabHeaderClassName: "px-4",
  };
  return (
    <Container>
      <div className="w-full pt-4 overflow-hidden rounded col-flex bg-base-100">
        <div className="items-center justify-between gap-4 px-4 row-flex">
          <div className="font-bold ">Edit Product</div>
          <Button
            progress
            onClick={(next) => {
              const current = generalRef?.current || {};
              console.log({ current });
              current?.onSubmit(next);
            }}
            size="sm"
            outline
            color="success"
          >
            Save
          </Button>
        </div>
        <Tabs {...tab_props} />
      </div>
    </Container>
  );
};

export default ProductModule;
