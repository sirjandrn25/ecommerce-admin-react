import useForm from "@Composites/FormBuilder/Hooks/useForm.hook";
import { PRODUCT_EDIT_ROUTE } from "@Constants/route.constant";
import useNavigation from "@Hooks/useNavigation.hook";
import { EmptyFunction } from "@Utils/common.utils";
import { sendRequest } from "@Utils/service.utils";
import Toast from "@Utils/toast.utils";
import { useEffectOnce } from "react-use";

const useProduct = () => {
  const { query, navigation } = useNavigation();
  const { id } = query || {};
 
  

  useEffectOnce(() => {
    fetchProductDetail();
  });
  const formSchema = [
    {
      name: "title",
      placeholder: "Enter title",
      label: "Title",
      isRequired: true,
    },
    {
      name: "subtitle",
      placeholder: "Enter subtitle",
      label: "Sub title",
      isRequired: true,
    },
    {
      name: "category_id",
      placeholder: "Enter categories",
      label: "Categories",
      type: "async_select",
      end_point: "/categories",
      isRequired: true,
    },
    {
      name: "description",
      placeholder: "Enter description",
      label: "Description",
      isRequired: true,
    },
    {
      name: "cost_price",
      label: "Cost Price",
      type: "number",
      isRequired: true,
    },
    {
      name: "selling_price",
      label: "Selling Price",
      type: "number",
      isRequired: true,
    },
    {
      name: "tax_rate",
      label: "Tax Rate",
      type: "number",
      isRequired: true,
    },
  ];

  const sanitizeData = (data: any) => {
    const newData = { ...data };
    if (!id) {
      delete newData["id"];
    }
    newData.tags = data?.tags?.map((tag: any) => tag?.value);
    return newData;
  };

  const handleSubmit = async (values: any, next = EmptyFunction) => {
    const { success, response } = await sendRequest({
      end_point: id ? `products/${id}` : "products",
      method: id ? "put" : "post",
      classParams: {
        ...sanitizeData(values),
      },
    });
    if (success) {
      Toast.success({ message: "Successfully saved " });
      if (!id) {
        navigation({
          pathname: `${PRODUCT_EDIT_ROUTE}/${response?.id}`,
        });
      }
    }
    next();
  };

  const { formData, handleFormData, onSubmit, error, setFormData } = useForm(
    formSchema,
    {},
    handleSubmit
  );

  const fetchProductDetail = async () => {
    
    if (!id || formData?.id) return;
    const { success, response } = await sendRequest({
      end_point: `products/${id}`,
    });

    if (success) {
      setFormData(response);
    }
  };

  return {
    formData,
    handleFormData,
    onSubmit,
    error,
  };
};

export default useProduct;
