import { asyncService } from "@Utils/service.utils";
import { useQuery } from "@tanstack/react-query";
import useProduct from "./useProduct.hook";

const useProductOption = () => {
  const { formData: product } = useProduct();

  const fetchProductOptions = () =>
    asyncService({
      end_point: `products/${product.id}/options`,
    });
  const { isLoading, data } = useQuery({
    queryFn: fetchProductOptions,
    queryKey: ["product options", product.id],
    retry: 2,
    enabled: !!product?.id,
  });
  return {
    isLoading,
    data: data as any[],
  };
};

export default useProductOption;
