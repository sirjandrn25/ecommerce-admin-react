import { FormInterface } from "@Composites/FormBuilder/Types/form.types";
import FormBuilder from "@Composites/FormBuilder/formBuilder";
import { EmptyFunction } from "@Utils/common.utils";
import { sendRequest } from "@Utils/service.utils";

const AddCategoryForm = ({ data, callback }: any) => {
  const isEdit = data?.id;
  const formSchema: FormInterface = {
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        isRequired: true,
        placeholder: "Enter name",
      },
      {
        name: "parent_id",
        label: "Parent",
        type: "async_select",
        end_point: "categories",
      },
    ],
    handleSubmit: async (values: any, next: any = EmptyFunction) => {
      const { success, response } = await sendRequest({
        end_point: "categories",
        method: "post",
        classParams: {
          ...values,
        },
      });
      if (success) {
        callback(response);
      }
      next();
    },
  };
  return <FormBuilder {...formSchema} />;
};

export default AddCategoryForm;
