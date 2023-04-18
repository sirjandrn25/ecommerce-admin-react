import Container from "@Components/Container/container.component";
import InputField from "@Components/Input/inputField.component";
import { useState } from "react";
import ContentWrapper from "./Components/contentWrapper.component";
import ProductVariant from "./Components/productVariant.component";

const ProductModule = () => {
  const [formData, setFormData] = useState();
  const handleFormData = (key: string, value: any) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  return (
    <Container>
      <div className="flex flex-col gap-4 p-4 px-8 ">
        <GeneralInformation {...{ handleFormData, formData }} />
        <ProductVariant />
      </div>
    </Container>
  );
};

const GeneralInformation = ({ formData, handleFormData }: any) => {
  return (
    <Container>
      <ContentWrapper
        title="General Information"
        subTitle="To start selling, all you need is a name and a price."
        contentClassName="grid grid-cols-2 gap-4"
      >
        <InputField
          value={formData?.title}
          onBlur={(value) => {
            handleFormData("title", value);
          }}
          placeholder="Enter title"
          label="Title"
          isRequired
        />
        <InputField
          onBlur={(value) => {
            handleFormData("sub_title", value);
          }}
          label="Subtitle"
          placeholder="Enter Subtitle"
        />

        <InputField
          type="textarea"
          label="Description"
          placeholder="Enter Subtitle"
          inputClassName="col-span-2"
          onBlur={(value) => {
            handleFormData("description", value);
          }}
        />
      </ContentWrapper>
    </Container>
  );
};

export default ProductModule;
