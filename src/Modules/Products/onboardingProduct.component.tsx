import React from "react";
import { Wizard } from "react-use-wizard";
import GeneralInformation from "./Components/generalInformation.componen";
import Container from "@Components/Container/container.component";
import ProductOption from "./Components/productOption.component";

const OnboardingProduct = () => {
  return (
    <Container>
      <Wizard>
        <GeneralInformation />
        <ProductOption />
      </Wizard>
    </Container>
  );
};

export default OnboardingProduct;
