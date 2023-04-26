import Button from "@Components/Button/button.component";
import Container from "@Components/Container/container.component";
import InputField from "@Components/Input/inputField.component";
import ContentWrapper from "./Components/contentWrapper.component";
import ProductVariant from "./Components/productVariant.component";
import useProduct from "./Hooks/useProduct.hook";
import useCategory from "./Hooks/useCategory.hook";
import AsyncSelectBox from "@Components/SelectBox/asyncSelectBox.component";
import { openAddCategory } from "@Utils/function.utils";

const ProductModule = () => {
  const { formData, handleFormData, handleSubmit } = useProduct();

  return (
    <Container>
      <div className="flex flex-col gap-4 p-4 px-8 ">
        <div className="flex items-center justify-end w-full">
          <Button onClick={handleSubmit} progress>
            Create Product
          </Button>
        </div>
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
        <AsyncSelectBox
          addNew={() => openAddCategory()}
          end_point="categories"
          label="Categories"
          defaultInputValue={formData?.category_id}
          onChange={(option) => {
            handleFormData("category_id", option.value);
          }}
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
