import { asyncService } from "@Utils/service.utils";
import { useQuery } from "@tanstack/react-query";
import useProduct from "./useProduct.hook";

const useProductVariant = () => {
  const { formData: product } = useProduct();
  const fetchList = () =>
    asyncService({
      end_point: `products/${product?.id}/variants`,
    });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product-variants", product?.id],
    queryFn: fetchList,
    enabled: !!product?.id,
  });
  return {
    data: data as any[],
    isLoading,
    fetchList: refetch,
  };
};

export default useProductVariant;
