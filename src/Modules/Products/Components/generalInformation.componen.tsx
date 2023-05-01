import InputField from "@Components/Input/inputField.component";
import AsyncSelectBox from "@Components/SelectBox/asyncSelectBox.component";
import SelectBox from "@Components/SelectBox/selecBox.component";
import useForm from "@Composites/FormBuilder/Hooks/useForm.hook";
import { EmptyFunction } from "@Utils/common.utils";
import { sendRequest } from "@Utils/service.utils";
import Toast from "@Utils/toast.utils";
import { forwardRef, useImperativeHandle, useRef } from "react";

const GeneralInformation = forwardRef((props, ref) => {
  const sanitizeData = (data: any) => {
    const newData = { ...data };
    newData.tags = data?.tags?.map((tag: any) => tag?.value);
    return newData;
  };

  const handleSubmit = async (values: any, next = EmptyFunction) => {
    const { success, response } = await sendRequest({
      end_point: "products",
      method: "post",
      classParams: {
        ...sanitizeData(values),
      },
    });
    if (success) {
      Toast.success({ message: "Successfully created product" });
    }
    next();
  };

  const formSchema = [
    {
      name: "title",
      placeholder: "Enter title",
      label: "Title",
      isRequired: true,
    },
    {
      name: "subtitle",
      placeholder: "Enter subtitle",
      label: "Sub title",
      isRequired: true,
    },
    {
      name: "category_id",
      placeholder: "Enter categories",
      label: "Categories",
      type: "async_select",
      end_point: "/categories",
      isRequired: true,
    },
    {
      name: "description",
      placeholder: "Enter description",
      label: "Description",
      isRequired: true,
    },
  ];

  const { formData, handleFormData, onSubmit, error } = useForm(
    formSchema,
    handleSubmit
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        onSubmit,
      };
    },
    [onSubmit]
  );
  console.log({ error });
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
