import Container from "@Components/Container/container.component";
import Tabs, { TabInterface } from "@Components/Tabs/tabs.component";
import GeneralInformation from "./Components/generalInformation.component";
import ProductVariant from "./Components/productVariant.component";
import { useRef, useState } from "react";
import Button from "@Components/Button/button.component";
import ProductOption from "./Components/productOption.component";


const ProductModule = () => {
  const generalRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<any>('general')



  const tab_props: TabInterface = {
    tabs: [
      {
        name: "General",
        key: "general",
        component: (
          <GeneralInformation

          />
        ),
      },
      {
        name: "Product Option",
        key: "option",
        component: <ProductVariantContainer />,
      },
      {
        name: "Product Variant",
        key: "variant",
        component: (
          <ProductVariant


          />
        ),
      },
      {
        name: "Shipping Information",
        key: "shipping",
        component: <div>Product Shipping Information</div>,
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
          {activeTab === 'general' && <Button
            progress
            onClick={(next) => {
              const current = generalRef?.current || {};
              current?.onSubmit(next);
            }}
            size="sm"
            outline
            color="success"
          >
            Save
          </Button>}
        </div>
        <Tabs onChangeTab={(key) => {
          setActiveTab(key)
        }} {...tab_props} isNavigation={false} />
      </div>
    </Container>
  );
};

const ProductVariantContainer = () => {


  return (
    <div className="flex flex-col items-center h-full gap-4 p-4">
      <div className="flex justify-end w-full gap-4">
        <ProductOption />
      </div>
    </div>
  )
}

export default ProductModule;
