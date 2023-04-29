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

const GeneralInformation = () => {
  const { formData, handleFormData } = useProduct();
  const formRef = useRef<any>();
  const { nextStep } = useWizard();
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
        name: "categories",
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
  };

  return (
    <ModalContainer
      title="Product Options"
      titleClassName="!bg-base-100 border-b"
      closeIcon={false}
    >
      <ModalBody>
        <FormBuilder {...formSchema} />
      </ModalBody>
      <ModalFooter className="!bg-base-100 border-t">
        <WizardFooter {...{ nextStep }} />
      </ModalFooter>
    </ModalContainer>
  );
};

export default GeneralInformation;
