import Button from "@Components/Button/button.component";
import Icon from "@Components/Icon/icon.component";
import CreatableInputField from "@Components/Input/creatableInputField.component";
import InputField from "@Components/Input/inputField.component";
import ModalContainer, {
  ModalBody,
  ModalFooter,
} from "@Components/Modal/modalContainer.component";
import { DeleteIcon } from "@Constants/imageMapping.constants";
import { EmptyFunction, getUuid4 } from "@Utils/common.utils";
import { sendRequest } from "@Utils/service.utils";
import { useMemo } from "react";
import { useList } from "react-use";
import useProduct from "../Hooks/useProduct.hook";

const ProductOption = ({ callback = EmptyFunction }: any) => {
  const { formData: product } = useProduct();

  const [list, { push, updateAt, removeAt }] = useList<any>(
    product?.values || [
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

  const sanitizeData = () => {
    return list.map((item) => {
      const newData = { ...item };
      newData.values = item.values.map((value: any) => ({
        name: value?.value,
      }));

      newData.product_id = product?.id;
      return newData;
    });
  };

  const promiseSubmit = async (option: any = {}) =>
    new Promise(async (resolve, reject) => {
      const { success, response } = await sendRequest({
        end_point: "product-options",
        method: "post",
        classParams: {
          ...option,
        },
      });
      if (success) resolve(response);
      else reject({});
    });

  const handleSubmit = async (next: any = EmptyFunction) => {
    let promises = sanitizeData().map((option) => promiseSubmit(option));

    Promise.all(promises)
      .then((result) => {
        next();
        callback();
      })
      .catch((error) => {
        next();
        callback();
        callback();
      });
  };

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
      <ModalFooter>
        <Button progress onClick={handleSubmit}>
          Save{" "}
        </Button>
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
        className="min-w-[200px]"
        placeholder="Colors"
        onChange={(value: string) => {
          onChange("title", value);
        }}
      />
      <CreatableInputField
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
        <Icon source={DeleteIcon} size={20} />
      </Button>
    </div>
  );
};

export default ProductOption;
