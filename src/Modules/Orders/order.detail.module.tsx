import Badge from "@Components/Badge/badge.component";
import {
  GenericDataRowDetailCard,
  GenericDataRowDetailCardInterface,
} from "@Components/Card/dataRow.component";
import Container from "@Components/Container/container.component";
import useNavigation from "@Hooks/useNavigation.hook";
import { FormatDisplayDate } from "@Utils/common.utils";
import { FormatCurrency } from "@Utils/currency.utils";
import { useMemo } from "react";
import OrderItems from "./Components/orderItems.component";
import useOrderDetail from "./Hooks/useOrderDetail.hook";

const OrderDetailModule = () => {
  const { id } = useNavigation();

  const { details, isLoading, orderItems } = useOrderDetail(id);

  const order_info_props: GenericDataRowDetailCardInterface = {
    title: "Order Info",
    data_rows: [
      {
        label: "Order Id",
        value: details?.display_id,
      },
      {
        label: "Total Amount",
        value: FormatCurrency(details?.amount || 0),
      },
      {
        label: "Payment Status",
        value: details?.payment_status,
      },
      {
        label: "Payment By",
        value: details?.payment_by,
      },

      {
        label: "Created At",
        value: FormatDisplayDate(details?.created_at),
      },
    ],
  };
  const total_payable = useMemo(() => {
    return details?.amount || 0 + details?.tax || 0 + details?.discount || 0;
  }, [details?.amount, details?.discount, details?.tax]);
  const order_summary: GenericDataRowDetailCardInterface = {
    title: "Order Summary",
    data_rows: [
      {
        label: "Total Amount",
        value: FormatCurrency(details?.amount || 0),
      },
      {
        label: "Tax",
        value: FormatCurrency(details?.tax || 0),
      },
      {
        label: "Discount",
        value: FormatCurrency(details?.discount || 0),
      },
      {
        label: "Total Payable",
        value: FormatCurrency(total_payable),
        type: "net",
      },
    ],
  };

  return (
    <Container>
      <div className="w-full gap-4 row-flex">
        <div className="w-3/5 ">
          <OrderItems {...{ items: orderItems }} />
        </div>
        <div className="flex-1 gap-4 col-flex">
          <div className="items-center justify-between p-4 rounded bg-neutral text-neutral-content row-flex">
            <Badge appearance="success" label="Approved" />
            <div className="gap-1 row-flex ">
              <span className="text-error">Amount</span> : {FormatCurrency(20)}
            </div>
          </div>
          <GenericDataRowDetailCard {...order_summary} />
          <GenericDataRowDetailCard {...order_info_props} />
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailModule;
