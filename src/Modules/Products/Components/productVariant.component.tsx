import Container from "@Components/Container/container.component";
import InputField from "@Components/Input/inputField.component";
import ContentWrapper from "./contentWrapper.component";
import { useList, useUpdateEffect } from "react-use";
import Button from "@Components/Button/button.component";
import Icon from "@Components/Icon/icon.component";
import { DeleteIcon } from "@Constants/imageMapping.constants";
import { useMemo, useState } from "react";
import SelectBox from "@Components/SelectBox/selecBox.component";

const ProductVariant = ({ formData, handleFormData }: any) => {
  const [
    list,
    {
      push,
      updateAt,

      removeAt,
    },
  ] = useList<any>([]);

  const disableAddNewOptions = useMemo(() => {
    if (!list?.length) return false;
    return !(list[list?.length - 1] as any)?.title;
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
      </ContentWrapper>
    </Container>
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
        isCreatable
        isMultiple
        onChange={(option) => {
          console.log(option);
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
