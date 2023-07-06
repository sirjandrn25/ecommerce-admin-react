import useForm from "@Composites/FormBuilder/Hooks/useForm.hook";
import useNavigation from "@Hooks/useNavigation.hook";
import { asyncService, sendRequest } from "@Utils/service.utils";
import Toast from "@Utils/toast.utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useProductOption from "./userProductOptions.hook";

const useProductVariant = () => {
  const { query } = useNavigation()
  const { id: product_id } = query
  const [editId, setEditId] = useState<number>()
  const [selectedValues, setSelectedValues] = useState<any>({})
  const isEdit = !!editId
  const [createLoading, setCreateLoading] = useState(false)
  const { data: options } = useProductOption({
    product_id
  })
  const fields = [
    {
      label: "Title",
      name: "title",
      placeholder: "Enter Title",
      type: "text",
      isRequired: true,
    },
    {
      label: "Stock",
      name: "stock",
      type: "number",
      placeholder: "Enter stock",
      isRequired: true,
    },
    {
      label: "Selling Price",
      name: "selling_price",
      isRequired: true,
      type: "number",
      placeholder: "Enter selling price",
    },
    {
      label: "Cost Price",
      name: "cost_price",
      type: "number",
      placeholder: "Enter cost price",
    },
  ]
  const handleSubmit = async (values: any) => {
    if (
      ((options as any)?.length !== Object.keys(selectedValues)?.length ||
        !(options as any)?.length) &&
      !isEdit
    ) {


      return
    }

    setCreateLoading(true)
    const { success } = await sendRequest({
      end_point: "product-variants",
      method: 'post',
      classParams: values

    })
    setCreateLoading(false)
    if (success) {
      setFormData({})
      Toast.success({ message: "Successfully saved" })
    }
  }
  const { formData, onSubmit, setFormData, renderFormField } = useForm(fields, {}, handleSubmit)
  const fetchList = () =>
    asyncService({
      end_point: `products/${product_id}/variants`,
    });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product-variants", product_id],
    queryFn: fetchList,
    enabled: !!product_id,
  });
  return {
    data: data as any[],

    isLoading,
    fetchVariants: refetch,
    onSubmit,
    createLoading,
    formData,
    isEdit,
    selectedValues,
    setSelectedValues,
    setEditId,
    renderFormField,
    setFormData,
    options


  };
};

export default useProductVariant;
