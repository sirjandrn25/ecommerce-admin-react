import Button from "@Components/Button/button.component";
import Container from "@Components/Container/container.component";
import Icon from "@Components/Icon/icon.component";
import InputField from "@Components/Input/inputField.component";
import ModalContainer, {
  ModalBody,
  ModalFooter,
} from "@Components/Modal/modalContainer.component";
import SelectBox, {
  parseSelectBoxValue,
} from "@Components/SelectBox/selecBox.component";
import { DeleteIcon } from "@Constants/imageMapping.constants";
import ModalUtil from "@Utils/modal.utils";
import { useMemo, useState } from "react";
import { useList, useUpdateEffect } from "react-use";
import useProduct from "../Hooks/useProduct.hook";
import ContentWrapper from "./contentWrapper.component";

const ProductVariant = () => {
  const [list, { push, updateAt, removeAt }] = useList<any>([]);
  const { handleFormData } = useProduct();

  useUpdateEffect(() => {
    handleFormData("options", list);
  }, [list]);

  const disableAddNewOptions = useMemo(() => {
    if (!list?.length) return false;
    const lastItem: any = list[list?.length - 1];
    return !lastItem?.title || !lastItem?.values?.length;
  }, [list]);

  return (
    <Container>
      <ContentWrapper
        title="Product Variant"
        subTitle="Add variations of this product.
          Offer your customers different options for color, format, size, shape, etc."
        contentClassName="flex flex-col gap-4"
      >
        {list?.map((option, index: number) => {
          return (
            <ProductOption
              key={option?.key}
              {...{ handleRemove: () => removeAt(index) }}
              onChange={(value: any) => {
                updateAt(index, value);
              }}
            />
          );
        })}
        <Button
          onClick={() => {
            push({
              title: "",
              values: [],
            });
          }}
          disabled={disableAddNewOptions}
          outline
          className="w-full"
        >
          Add New Options
        </Button>
        <VariantData options={list} />
      </ContentWrapper>
    </Container>
  );
};

const VariantData = ({ data = [], options = [], callback }: any) => {
  const [list, { push, updateAt, removeAt }] = useList(data);
  const { handleFormData } = useProduct();
  useUpdateEffect(() => {
    handleFormData("variants", list);
  }, [list]);

  const isDisabled = () => {
    if (!options.length) return true;

    return !options[0]?.values?.length;
  };

  const openVariant = (data: any = {}, index?: number) => {
    return ModalUtil.open({
      component: Variant,
      props: {
        options,
        callback: (data: any) => {
          if (typeof index !== "undefined") {
            updateAt(index, data);
          } else {
            push(data);
          }
          ModalUtil.close();
        },
        data,
      },
    });
  };

  const VariantItem = ({ item, index }: any) => {
    return (
      <div className="flex flex-row items-center justify-between p-4">
        <div className="">{item?.title}</div>
        <div>{item?.quantity}</div>
        <div>
          <Button
            onClick={() => openVariant(item, index)}
            outline
            size="sm"
            shape="square"
          >
            Edit
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 w-full">
      <div className="flex flex-col gap-4">
        {list.map((item, index) => {
          return <VariantItem key={index} {...{ item, index }} />;
        })}
      </div>
      <Button
        className="w-full "
        onClick={() => openVariant()}
        disabled={isDisabled()}
        outline
      >
        Add New Product Variants
      </Button>
    </div>
  );
};

const Variant = ({ data = {}, options, callback }: any) => {
  const [formData, setFormData] = useState<any>(data);
  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const handleOption = (key: string, value: any) => {
    const values = formData?.option_values ? formData?.option_values : "";

    handleChange("option_values", {
      ...values,
      [key]: value,
    });
  };

  return (
    <ModalContainer title="Add Product Variant">
      <ModalBody className="flex flex-col gap-4">
        <InputField
          label="Title"
          className="flex-1"
          placeholder="Enter title"
          onChange={(value) => handleChange("title", value)}
          value={formData?.title}
        />
        <div className="flex items-center gap-4 ">
          <InputField
            label="Price"
            placeholder="Enter price"
            className="flex-1"
            onChange={(value) => handleChange("price", +value)}
            type="number"
            value={formData?.price}
          />
          <InputField
            label="Quantity"
            placeholder="Enter Quantity"
            className="flex-1"
            onChange={(value) => handleChange("quantity", +value)}
            type="number"
            value={formData?.price}
          />
        </div>
        <div className="flex items-center gap-4">
          {options.map((option: any) => {
            const value = formData?.option_values
              ? formData?.option_values[option?.title]
              : "";

            return (
              <SelectBox
                options={parseSelectBoxValue(option?.values, "title", "slug")}
                key={option?.title}
                defaultInputValue={value}
                onChange={(value) => {
                  handleOption(option?.title, value?.value);
                }}
                label={option?.title}
                className="min-w-[200px]"
              />
            );
          })}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          onClick={() => {
            callback(formData);
          }}
          color="success"
        >
          Save
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

const ProductOption = ({ handleRemove, onChange }: any) => {
  const [formData, setFormData] = useState<any>({});
  useUpdateEffect(() => {
    onChange(formData);
  }, [formData]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const formatData = (values: any) => {
    const newData = (values || [])?.map((value: any, index: number) => {
      let data = {
        title: value?.label,
        slug: `slug_${index}_${value?.value}`,
      };
      return data;
    });
    return newData;
  };

  return (
    <div className="flex items-center w-full gap-4">
      <InputField
        onBlur={(value) => {
          handleChange("title", value);
        }}
        label="Title"
        placeholder="Color"
        className="flex-1"
      />
      <SelectBox
        options={[]}
        label="Values"
        className="flex-1"
        defaultInputValue={formData?.values}
        isCreatable
        isMultiple
        onChange={(value) => {
          handleChange("values", formatData(value));
        }}
      />
      <Button
        onClick={handleRemove}
        outline
        size="sm"
        color="error"
        shape="square"
      >
        <Icon source={DeleteIcon} iconColor="text-error" isReactIcon />
      </Button>
    </div>
  );
};

export default ProductVariant;
