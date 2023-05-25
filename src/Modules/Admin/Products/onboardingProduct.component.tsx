import React from "react";
import { Wizard } from "react-use-wizard";
import GeneralInformation from "./Components/generalInformation.component";
import Container from "@Components/Container/container.component";
import ProductOption from "./Components/productOption.component";
import ProductVariant from "./Components/productVariant.component";

const Wrapper = ({ children }: any) => {
  return <div className="min-w-[800px]">{children}</div>;
};

const OnboardingProduct = () => {
  return (
    <Container>
      <Wizard wrapper={<Wrapper />}>
        <GeneralInformation />
        <ProductOption />
        <ProductVariant />
      </Wizard>
    </Container>
  );
};

export default OnboardingProduct;
