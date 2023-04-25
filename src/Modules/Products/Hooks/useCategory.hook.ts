import { asyncService } from "@Utils/service.utils";
import { useQuery } from "@tanstack/react-query";

const useCategory = () => {
  const fetchCategory = () =>
    asyncService({
      end_point: "categories",
      attachSessionId: true,
    });
  const { data, isLoading } = useQuery({
    queryFn: fetchCategory,
    queryKey: ["categories"],
  });
  return {
    categories: data as any[],
    isLoading,
  };
};

export default useCategory;
