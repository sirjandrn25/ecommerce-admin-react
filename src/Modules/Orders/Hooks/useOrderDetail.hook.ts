import { EmptyFunction } from "@Utils/common.utils";
import { asyncService, sendRequest } from "@Utils/service.utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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

  const {
    isLoading,
    data,
    refetch: fetchOrderDetail,
  } = useQuery({
    queryFn: fetchDetail,
    queryKey: ["sub order details", id],
  });

  const handleStatusChange = async (
    values: any = {},
    next: any = EmptyFunction
  ) => {
    const { success, response } = await sendRequest({
      end_point: SubOrderController.statusChange(id),
      method: "put",
      classParams: {
        ...values,
      },
    });
    next();
    if (success) fetchOrderDetail();
  };

  const total_amount = useMemo(() => {
    return (orderItems as any).reduce((acc: number, item: any) => {
      return acc + item?.order_item?.unit_price * item?.order_item?.quantity;
    }, 0);
  }, [orderItems]);
  return {
    isLoading,
    details: data as any,
    orderItems: orderItems as any[],
    // handlePaymentStatusChange,
    handleStatusChange,
    total_amount,
  };
};

export default useOrderDetail;
