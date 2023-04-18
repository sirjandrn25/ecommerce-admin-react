import { useQuery } from "@tanstack/react-query";
import { asyncService } from "@Utils/service.utils";
import { useState } from "react";

const useGenericListing = ({ end_point }: any) => {
  const [pagination, setPagination] = useState<any>({
    limit: 20,
    page: 1,
  });
  const [filters, setFilters] = useState<any>({});
  const fetchList = () =>
    asyncService({
      end_point,
    });
  const { data, isLoading } = useQuery({
    queryFn: fetchList,
    queryKey: ["generic_listing", end_point, pagination, filters],
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
