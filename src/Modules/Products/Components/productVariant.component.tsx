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
import { useWizard } from "react-use-wizard";
import useProduct from "../Hooks/useProduct.hook";
import useProductVariant from "../Hooks/useProductVariant.hook";

const ProductVariant = () => {
  const { previousStep, nextStep } = useWizard();
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

  return (
    <ModalContainer
      title="Product Variant"
      titleClassName="!bg-base-100 border-b"
      closeIcon={false}
    >
      <ModalBody className="flex flex-col gap-4">
        <div className="flex items-center justify-end">
          <Button onClick={() => openVariantForm()} outline size="sm">
            Add New
          </Button>
        </div>

        <VariantItems {...{ data }} />
      </ModalBody>
      {/* <ModalFooter className="!bg-base-100 border-t">
        <WizardFooter {...{ previousStep, nextStep: handleSubmit }} />
      </ModalFooter> */}
    </ModalContainer>
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
  const { formData: product } = useProduct();
  const { options = [] } = product || {};

  const [currencies] = useCurrency();
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

  const handlePrices = (key: number, value: number) => {
    const prices = variantForm?.prices;
    handleFormData("prices", {
      ...prices,
      [key]: value,
    });
  };
  const handleValues = (key: string, value: any) => {
    const values = variantForm?.option_values || {};
    handleFormData("option_values", {
      ...values,
      [key]: value,
    });
  };
  const sanitizeData = () => {
    const newData = { ...variantForm };
    const prices = [];
    for (let [key, value] of Object.entries(newData?.prices)) {
      prices.push({
        currency_id: Number(key),
        price: value,
      });
    }
    newData.prices = prices;
    const option_values = [];
    for (let value of Object.values(newData.option_values)) {
      option_values.push({ id: value });
    }
    newData.option_values = option_values;
    return newData;
  };
  const handleSave = async (next = EmptyFunction) => {
    const { success, response } = await sendRequest({
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
          <ContentItem title="Prices">
            {currencies?.map((currency: any) => {
              return (
                <CurrencyInput
                  label={Capitalize(currency?.name)}
                  className="flex-1"
                  placeholder="Enter price"
                  onChange={(value: string) => {
                    handlePrices(currency?.id, +value);
                  }}
                  symbol={currency?.symbol}
                  key={currency?.id}
                />
              );
            })}
          </ContentItem>
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
