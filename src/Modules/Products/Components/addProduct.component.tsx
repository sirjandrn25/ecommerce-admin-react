import Container from "@Components/Container/container.component";
import React, { useRef } from "react";
import GeneralInformation from "./generalInformation.componen";
import Button from "@Components/Button/button.component";

const AddProduct = () => {
  const formRef = useRef<any>();
  return (
    <Container>
      <div className="w-full h-full gap-4 col-flex">
        <div className="items-center justify-between w-full p-4 rounded-lg row-flex bg-base-100">
          <div className="font-bold">Add New Product</div>
          <Button
            progress
            onClick={(next) => {
              const current = formRef?.current || {};

              current?.onSubmit(next);
            }}
            size="sm"
            outline
            color="success"
          >
            Save
          </Button>
        </div>
        <GeneralInformation ref={formRef} />
      </div>
    </Container>
  );
};

export default AddProduct;
