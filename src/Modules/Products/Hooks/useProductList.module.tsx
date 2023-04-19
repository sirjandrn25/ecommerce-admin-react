import { PRODUCT_API_ROUTE } from "@Constants/apiRoute.constant";
import { asyncService } from "@Utils/service.utils";
import { useQuery } from "@tanstack/react-query";

const useProductList = () => {
  const fetchProducts = () => {
    return asyncService({
      end_point: PRODUCT_API_ROUTE,
      method: "get",
    });
  };
  const {
    data: products,
    isLoading,
    isSuccess,
    refetch: fetchList,
  } = useQuery({
    queryKey: ["products", "list"],
    queryFn: fetchProducts,
  });

  return {
    products,
    isLoading,
    isSuccess,
    fetchList,
  };
};

export default useProductList;
