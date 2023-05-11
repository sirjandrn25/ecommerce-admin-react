import Button from "@Components/Button/button.component";
import CurrencyInput from "@Components/Input/currencyInput.component";
import InputField from "@Components/Input/inputField.component";
import ModalContainer, {
  ModalBody,
  ModalFooter,
} from "@Components/Modal/modalContainer.component";
import SelectBox, {
  parseSelectBoxValue,
} from "@Components/SelectBox/selecBox.component";
import GenericTable from "@Composites/GenericTable/genericTable.component";
import useCurrency from "@Hooks/useCurrency.hook";
import { Capitalize, EmptyFunction } from "@Utils/common.utils";
import ModalUtil from "@Utils/modal.utils";
import { sendRequest } from "@Utils/service.utils";
import { useState } from "react";
import useProduct from "../Hooks/useProduct.hook";
import useProductVariant from "../Hooks/useProductVariant.hook";
import useProductOption from "../Hooks/userProductOptions.hook";
import ProductOption from "./productOption.component";
import error from "next/error";

const ProductVariant = () => {
  const { data } = useProductVariant();

  const openVariantForm = (index?: number) => {
    ModalUtil.open({
      component: VariantForm,
      modalSize: "lg",
      props: {
        callback: (data: any) => {
          ModalUtil.close();
        },
      },
    });
  };
  const openProductOptionForm = () => {
    ModalUtil.open({
      component: ProductOption,
      modalSize: "lg",
      props: {
        callback: (data: any) => {
          ModalUtil.close();
        },
      },
    });
  };

  return (
    <div className="gap-4 p-4 rounded-lg col-flex bg-base-100">
      <div className="flex items-center justify-end gap-4">
        <Button onClick={() => openProductOptionForm()} outline size="sm">
          Add Option
        </Button>
        <Button onClick={() => openVariantForm()} outline size="sm">
          Add New
        </Button>
      </div>

      <VariantItems {...{ data }} />
    </div>
  );
};

const VariantItems = ({ data = [], onRemove, onEdit }: any) => {
  const columns = [
    {
      name: "name",
      key: "title",
    },
    {
      name: "Inventory",
      key: "stock",
    },
  ];

  return <GenericTable {...{ columns, data }} />;
};

const VariantForm = ({ item, callback = EmptyFunction }: any) => {
  const [variantForm, setVariantForm] = useState<any>({});
  const { data: options } = useProductOption();
  const { formData: product } = useProduct();
  const optionValue = (option: any) => {
    const values = variantForm?.values || {};
    return values[option?.id];
  };
  const handleFormData = (key: string, value: any) =>
    setVariantForm((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });

  const handleValues = (key: string, value: any) => {
    const values = variantForm?.option_values || {};
    handleFormData("option_values", {
      ...values,
      [key]: value,
    });
  };
  const sanitizeData = () => {
    const newData = { ...variantForm };

    const option_values = [];
    for (let value of Object.values(newData.option_values)) {
      option_values.push({ id: value });
    }
    newData.option_values = option_values;
    return newData;
  };
  const handleSave = async (next = EmptyFunction) => {
    const { success } = await sendRequest({
      end_point: "/product-variants",
      method: "post",
      classParams: {
        ...sanitizeData(),
        product_id: product?.id,
      },
    });
    if (success) {
      callback();
    }
    next();
  };

  return (
    <ModalContainer title="Create Variant">
      <ModalBody>
        <div className="gap-4 col-flex">
          <div className="flex items-end justify-between gap-4 ">
            <InputField
              value={item?.title}
              label="Title"
              className="flex-1"
              placeholder="Colors"
              onChange={(value: string) => {
                handleFormData("title", value);
              }}
            />
            <InputField
              value={item?.title}
              label="Quantity"
              className="flex-1"
              placeholder="Enter quantity"
              type={"number"}
              onChange={(value: string) => {
                handleFormData("stock", +value);
              }}
              isRequired
            />
          </div>
          <div className="items-center justify-between gap-4 row-flex">
            <CurrencyInput
              label="Selling Price "
              symbol="dollor"
              value={variantForm?.selling_price}
              placeholder="Enter selling price"
              className="flex-1"
              isRequired
              onChange={(value) => {
                handleFormData("selling_price", +value);
              }}
            />
            <CurrencyInput
              label="Cost Price "
              symbol="dollor"
              value={variantForm?.cost_price}
              placeholder="Enter cost price"
              className="flex-1"
              isRequired
              onChange={(value) => {
                handleFormData("cost_price", +value);
              }}
            />
          </div>
          <ContentItem title="Options">
            {options?.map((option: any) => {
              return (
                <SelectBox
                  label={`${Capitalize(option?.title)}`}
                  key={option?.id}
                  defaultInputValue={optionValue(option)}
                  options={parseSelectBoxValue(
                    option?.values || [],
                    "name",
                    "id"
                  )}
                  onChange={(option_value) =>
                    handleValues(option.id, option_value?.value)
                  }
                  className="flex-1"
                />
              );
            })}
          </ContentItem>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSave} progress color="success">
          Save
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};
const ContentItem = ({ title, children }: any) => {
  return (
    <div className="gap-1 col-flex">
      <div className="font-bold">{Capitalize(title)}</div>
      <div className="flex-wrap gap-4 row-flex">{children}</div>
    </div>
  );
};

export default ProductVariant;
