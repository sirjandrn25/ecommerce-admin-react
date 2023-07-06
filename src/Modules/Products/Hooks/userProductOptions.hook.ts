import { asyncService, sendRequest } from "@Utils/service.utils";
import Toast from "@Utils/toast.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useProductOption = ({product_id}:any) => {
  const [formData, setFormData] = useState<any>({})


  const fetchProductOptions = () =>
    asyncService({
      end_point: `products/${product_id}/options`,
    });
  const { isLoading, data,refetch } = useQuery({
    queryFn: fetchProductOptions,
    queryKey: ["product options",product_id],
    retry: 2,
    enabled: !!product_id,
  });
  const {mutate:optionCreate,isLoading:createLoading} = useMutation({
    mutationFn:async (data)=>{
        const {success,response} = await sendRequest({
          end_point: "product-options",
          method:'post',
          classParams:data
        })
        if(success) return response
        else {}
    },
    onSuccess: () => {
      setFormData({})
      refetch()
    },
  })
  const handleDelete = async (id:number)=>{
    const {success} = await sendRequest({
      end_point: "product-options/"+id,
      method:'delete'
    })
    if(success) {
      refetch()
      Toast.success({message:"Delete Option successfully"})
    }
    else Toast.error({message:"Something went wrong"})
  }
  const {mutate:onDelete,isLoading:deleteLoading} = useMutation({
    mutationFn:handleDelete,
    
  })
  return {
    isLoading,
    data: data as any[],
    fetchOptions:refetch,
    optionCreate,createLoading,
    formData,
    setFormData,
    deleteLoading,
    onDelete

  };
};

export default useProductOption;
