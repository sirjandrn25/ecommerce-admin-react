import Button from "@Components/Button/button.component";
import InputField from "@Components/Input/inputField.component";
import ModalContainer, {
  ModalBody,
  ModalFooter,
} from "@Components/Modal/modalContainer.component";
import SelectBox from "@Components/SelectBox/selecBox.component";
import { EmptyFunction, getUuid4 } from "@Utils/common.utils";
import { useMemo } from "react";
import { useList } from "react-use";
import { useWizard } from "react-use-wizard";
import useProduct from "../Hooks/useProduct.hook";
import WizardFooter from "./wizardFooter.component";
import { DeleteIcon } from "@Constants/imageMapping.constants";
import Icon from "@Components/Icon/icon.component";

const ProductOption = () => {
  const { formData, handleFormData } = useProduct();
  const { previousStep, nextStep } = useWizard();
  const [list, { push, updateAt, removeAt }] = useList<any>(
    formData?.values || [
      {
        title: undefined,
        slug: getUuid4(),
      },
    ]
  );

  const disabledAddNew = useMemo(() => {
    if (!list?.length) return false;
    return !list[list?.length - 1]?.title;
  }, [list]);

  return (
    <ModalContainer
      title="Product Options"
      titleClassName="!bg-base-100 border-b"
      closeIcon={false}
    >
      <ModalBody className="flex flex-col gap-4">
        <div className="flex items-center justify-end">
          <Button
            onClick={() => {
              push({ title: undefined, slug: getUuid4() });
            }}
            outline
            size="sm"
            disabled={disabledAddNew}
          >
            Add Option
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {list.map((item, index) => {
            return (
              <OptionForm
                {...{ item }}
                key={item?.slug}
                onRemove={() => removeAt(index)}
                onChange={(key: string, value: any) =>
                  updateAt(index, { ...item, [key]: value })
                }
              />
            );
          })}
        </div>
      </ModalBody>
      <ModalFooter className="!bg-base-100 border-t">
        <WizardFooter {...{ previousStep, nextStep }} />
      </ModalFooter>
    </ModalContainer>
  );
};

const OptionForm = ({
  item,
  onRemove = EmptyFunction,
  onChange = EmptyFunction,
}: any) => {
  return (
    <div className="flex items-end justify-between gap-4">
      <InputField
        value={item?.title}
        label="Title"
        className="flex-1"
        placeholder="Colors"
        onChange={(value: string) => {
          onChange("title", value);
        }}
      />
      <SelectBox
        defaultInputValue={item?.values || []}
        label="Values"
        className="flex-1"
        placeholder="Red, Green, and Blue"
        onChange={(option) => {
          onChange("values", option);
        }}
        isCreatable
      />
      <Button
        onClick={onRemove}
        size="sm"
        className="h-[36px] w-[36px] p-1"
        outline
        color="error"
      >
        <Icon source={DeleteIcon} size={20} iconColor="text-error" />
      </Button>
    </div>
  );
};

export default ProductOption;
