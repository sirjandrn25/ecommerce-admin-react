import { asyncService } from "@Utils/service.utils";
import { useQuery } from "@tanstack/react-query";

const useCurrency = () => {
  const { data: currencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: () =>
      asyncService({
        end_point: "currencies",
      }),
  });

  return [(currencies as any)?.data || []];
};

export default useCurrency;
