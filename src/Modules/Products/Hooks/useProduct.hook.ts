import { EmptyFunction } from "@Utils/common.utils";
import { sendRequest } from "@Utils/service.utils";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeData } from "src/Store/Slicers/Product/product.slicer";
import { RootState } from "src/Store/store";

const useProduct = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state?.product?.formData);

  const handleFormData = (key: string, value: any) => {
    const newData = { [key]: value };

    dispatch(handleChangeData(newData));
  };

  const sanitizeData = () => {
    const newData = { ...formData };
    let variants = [];
    for (let variant of newData?.variants) {
      const values = [];
      for (const [key, value] of Object.entries(variant?.option_values))
        values.push(value);
      variants.push({
        ...variant,
        option_values: values,
      });
    }
    newData.variants = variants;
    return newData;
  };

  const handleSubmit = async (next: any = EmptyFunction) => {
    const { success, response } = await sendRequest({
      end_point: "/products",
      method: "post",
      classParams: {
        ...sanitizeData(),
      },
    });

    next();
  };
  const setFormData = (data: any) => {
    dispatch(handleChangeData(data));
  };
  return {
    handleFormData,
    formData,
    handleSubmit,
    setFormData,
  };
};

export default useProduct;
