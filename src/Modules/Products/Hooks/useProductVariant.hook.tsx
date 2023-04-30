import { asyncService } from "@Utils/service.utils";
import { useQuery } from "@tanstack/react-query";

const useProductVariant = () => {
  const fetchList = () =>
    asyncService({
      end_point: "product-variants",
    });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product-variants"],
    queryFn: fetchList,
  });
  return {
    data: data as any[],
    isLoading,
    fetchList: refetch,
  };
};

export default useProductVariant;
