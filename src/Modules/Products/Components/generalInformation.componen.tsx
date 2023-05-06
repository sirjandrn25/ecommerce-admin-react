import CurrencyInput from "@Components/Input/currencyInput.component";
import InputField from "@Components/Input/inputField.component";
import AsyncSelectBox from "@Components/SelectBox/asyncSelectBox.component";
import SelectBox from "@Components/SelectBox/selecBox.component";
import { openAddCategory } from "@Utils/function.utils";
import { forwardRef, useImperativeHandle } from "react";
import useProduct from "../Hooks/useProduct.hook";

const GeneralInformation = forwardRef((props, ref) => {
  const { handleFormData, onSubmit, formData, error } = useProduct();

  useImperativeHandle(
    ref,
    () => {
      return {
        onSubmit,
      };
    },
    [onSubmit]
  );

  return (
    <div className="w-full gap-4 row-flex">
      <div className="w-full gap-4 col-flex">
        <WrapperBox title="Basic Information">
          <div className="gap-4 col-flex">
            <InputField
              label="Title"
              placeholder="Enter title"
              className="flex-1"
              onChange={(value) => handleFormData("title", value)}
              value={formData?.title}
              error={error?.title}
              isRequired
            />
            <InputField
              label="Sub Title"
              placeholder="Enter sub title"
              className="flex-1"
              onChange={(value) => handleFormData("subtitle", value)}
              value={formData?.subtitle}
              error={error?.subtitle}
              isRequired
            />
            <InputField
              label="Description"
              type="textarea"
              placeholder="Enter description"
              className="flex-1"
              onChange={(value) => handleFormData("description", value)}
              value={formData?.description}
              error={error?.description}
              isRequired
            />
          </div>
        </WrapperBox>
        <WrapperBox>
          <div className="grid grid-cols-2 gap-4">
            <CurrencyInput
              label="Selling Price "
              symbol="rupee"
              value={formData?.selling_price}
              placeholder="Enter selling price"
              error={error?.selling_price}
              isRequired
              onChange={(value) => {
                handleFormData("selling_price", +value);
              }}
            />
            <CurrencyInput
              label="Cost Price "
              symbol="rupee"
              value={formData?.cost_price}
              error={error?.cost_price}
              placeholder="Enter cost price"
              isRequired
              onChange={(value) => {
                handleFormData("cost_price", +value);
              }}
            />
            <InputField
              label="Tax Rate "
              type="number"
              value={formData?.tax_rate}
              error={error?.tax_rate}
              placeholder="Enter tax rate"
              isRequired
              onChange={(value) => {
                handleFormData("tax_rate", +value);
              }}
            />
          </div>
        </WrapperBox>
      </div>

      <div className="w-1/3 gap-4 col-flex">
        <WrapperBox title="Organization Information">
          <div className="gap-4 col-flex">
            <AsyncSelectBox
              isRequired
              end_point="categories"
              label="Category"
              defaultInputValue={formData?.category_id}
              onChange={(option) => {
                handleFormData("category_id", option?.value);
              }}
              error={error?.category_id}
              addNew={() => openAddCategory()}
            />
            <SelectBox
              isCreatable
              label="Tags"
              placeholder="Enter tags"
              onChange={(value) => {
                handleFormData("tags", value);
              }}
            />
          </div>
        </WrapperBox>
        <WrapperBox title="Files Information">
          <div className="gap-4 col-flex">
            <InputField type="file" label="Thumbnail" />
            <InputField type="file" label="Images" />
          </div>
        </WrapperBox>
      </div>
    </div>
  );
});
GeneralInformation.displayName = "General Information";

const WrapperBox = ({ children, className = "", title = "" }: any) => {
  return (
    <div
      className={`bg-base-100 p-6 rounded-lg col-flex gap-4 flex-1 ${className}`}
    >
      <div className="font-bold">{title}</div>
      {children}
    </div>
  );
};

export default GeneralInformation;
