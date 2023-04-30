import ModalContainer, {
  ModalBody,
  ModalFooter,
} from "@Components/Modal/modalContainer.component";
import { FormInterface } from "@Composites/FormBuilder/Types/form.types";
import FormBuilder from "@Composites/FormBuilder/formBuilder";
import { useRef } from "react";
import { useWizard } from "react-use-wizard";
import useProduct from "../Hooks/useProduct.hook";
import WizardFooter from "./wizardFooter.component";
import { EmptyFunction } from "@Utils/common.utils";
import { sendRequest } from "@Utils/service.utils";

const GeneralInformation = () => {
  const { formData, handleFormData, setFormData } = useProduct();
  const formRef = useRef<any>();
  const { nextStep } = useWizard();

  const handleSubmit = async (values: any, next = EmptyFunction) => {
    const { success, response } = await sendRequest({
      end_point: "products",
      method: "post",
      classParams: {
        ...values,
      },
    });
    if (success) {
      nextStep();
      setFormData({ ...response });
    } else {
      console.log({ response });
    }
    next();
  };
  const formSchema: FormInterface = {
    fields: [
      {
        name: "title",
        placeholder: "Enter title",
        label: "Title",
      },
      {
        name: "subtitle",
        placeholder: "Enter subtitle",
        label: "Sub title",
      },
      {
        name: "category_id",
        placeholder: "Enter categories",
        label: "Categories",
        type: "async_select",
        end_point: "/categories",
      },
      {
        name: "description",
        placeholder: "Enter description",
        label: "Description",
      },
    ],
    layout: "two",
    hiddenSubmit: true,
    handleSubmit,
  };

  return (
    <ModalContainer
      title="General Information"
      titleClassName="!bg-base-100 border-b"
      closeIcon={false}
    >
      <ModalBody>
        <FormBuilder ref={formRef} {...formSchema} />
      </ModalBody>
      <ModalFooter className="!bg-base-100 border-t">
        <WizardFooter
          {...{
            nextStep: (next = EmptyFunction) => {
              const onSubmit = formRef?.current?.onSubmit || EmptyFunction;
              onSubmit(next);
            },
            nextProgress: true,
          }}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export default GeneralInformation;
