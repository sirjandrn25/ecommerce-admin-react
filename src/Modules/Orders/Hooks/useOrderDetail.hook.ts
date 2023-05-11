import { asyncService } from "@Utils/service.utils";
import { useQuery } from "@tanstack/react-query";
import { SubOrderController } from "src/Controllers/Order/suborder.controller";

const useOrderDetail = (id: number) => {
  const fetchDetail = () =>
    asyncService({
      end_point: SubOrderController.retrieve(id),
    });
  const fetchOrderItems = () =>
    asyncService({
      end_point: SubOrderController.orderItems(id),
    });
  const { data: orderItems = [] } = useQuery({
    queryFn: fetchOrderItems,
    queryKey: ["sub order items", id],
  });

  const { isLoading, data } = useQuery({
    queryFn: fetchDetail,
    queryKey: ["sub order details", id],
  });
  return {
    isLoading,
    details: data as any,
    orderItems: orderItems as any[],
  };
};

export default useOrderDetail;
