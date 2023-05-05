import InputField from "@Components/Input/inputField.component";
import AsyncSelectBox from "@Components/SelectBox/asyncSelectBox.component";
import SelectBox from "@Components/SelectBox/selecBox.component";
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
