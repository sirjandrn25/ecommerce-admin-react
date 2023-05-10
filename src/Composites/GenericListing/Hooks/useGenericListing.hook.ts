import { useQuery } from "@tanstack/react-query";
import { asyncService } from "@Utils/service.utils";
import { useState } from "react";
import routers from "src/Controllers/route.controller";

const useGenericListing = ({ type }: any) => {
  const controller = routers[type];

  const [pagination, setPagination] = useState<any>({
    limit: 20,
    page: 1,
  });

  const [filters, setFilters] = useState<any>({});
  const fetchList = () =>
    asyncService({
      end_point: controller.list(),
    });
  const { data, isLoading } = useQuery({
    queryFn: fetchList,
    queryKey: ["generic_listing", controller.list(), pagination, filters],
  });

  return {
    data: data as any[],
    isLoading,
    pagination,
    setPagination,
    filters,
    setFilters,
  };
};

export default useGenericListing;
