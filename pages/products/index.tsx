import Button from "@Components/Button/button.component";
import { SelectOptionType } from "@Components/SelectBox/selecBox.component";
import { FormInterface } from "@Composites/FormBuilder/Types/form.types";
import FormBuilder from "@Composites/FormBuilder/formBuilder";
import SlidingPaneUtil from "@Utils/slidingPane.utils";
import { useEffect, useRef, useState } from "react";

const Product = () => {
  const [title, setTitle] = useState("This is Title");
  const formRef = useRef<any>();

  useEffect(() => {
    SlidingPaneUtil.updateProps({ headingTitle: title });
  }, [title]);
  const country_options: SelectOptionType[] = [
    { value: 1, label: "Nepal" },
    { value: 2, label: "India" },
    { value: 3, label: "America" },
  ];
  const form_props: FormInterface = {
    fields: [
      {
        name: "first_name",
        label: "First Name",
        type: "text",
        isRequired: true,
      },
      {
        name: "last_name",
        label: "Last Name",
        type: "text",
      },

      {
        name: "email",
        label: "Email Address",
        type: "email",
        isRequired: true,
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        isRequired: true,
        validation: {
          minLength: 10,
          maxLength: 20,
        },
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        options: country_options,
        isRequired: true,
        isMultiple: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
    ],
    layout: "two",
    handleSubmit: (data: any) => {
      console.log({ data });
    },
  };
  console.log(formRef);

  return (
    <div className="gap-10 col-flex">
      <FormBuilder {...form_props} ref={formRef} />
      <Button
        onClick={() => {
          // formRef?.current?.onSubmit();
        }}
      >
        Extra Submit
      </Button>
    </div>
  );
};

export default Product;
