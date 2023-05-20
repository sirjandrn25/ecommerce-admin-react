import { EmptyFunction } from "@Utils/common.utils";
import { asyncService, sendRequest } from "@Utils/service.utils";
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
  // const handlePaymentStatusChange = async (value: string) => {
  //   const { success, response } = await sendRequest({
  //     end_point: SubOrderController.statusChange(id),
  //     method: "post",
  //     classParams: {
  //       payment_status: value,
  //     },
  //   });
  //   if (success) fetchOrderDetail();
  // };
  return {
    isLoading,
    details: data as any,
    orderItems: orderItems as any[],
    // handlePaymentStatusChange,
    handleStatusChange,
  };
};

export default useOrderDetail;
