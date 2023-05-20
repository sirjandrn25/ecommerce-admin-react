import Card from "@Components/Card/card.component";
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

  const { details, isLoading, orderItems, handleStatusChange } =
    useOrderDetail(id);

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
        label: "Payment By",
        value: details?.payment_by,
      },

      {
        label: "Created At",
        value: FormatDisplayDate(details?.created_at),
      },
    ],
  };

  const order_summary: GenericDataRowDetailCardInterface = {
    title: "Order Summary",
    data_rows: [
      {
        label: "Order Date",
        value: FormatDisplayDate(details?.created_at),
      },
      {
        label: "Payment Method",
        value: details?.payment_by,
      },
      {
        label: "Shipping Method",
        value: details?.payment_by,
      },
    ],
    className: "flex-1 ",
  };
  const total_payable = useMemo(() => {
    return details?.amount || 0 + details?.tax || 0 + details?.discount || 0;
  }, [details?.amount, details?.discount, details?.tax]);
  const order_price: GenericDataRowDetailCardInterface = {
    title: "Order Price",
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
        label: "Shipping Charge",
        value: FormatCurrency(details?.discount || 20),
      },
      {
        label: "Total Payable",
        value: FormatCurrency(total_payable),
        type: "net",
      },
    ],
    className: "flex-1",
  };
  const customer_detail: GenericDataRowDetailCardInterface = {
    title: "Customer Details",
    data_rows: [
      {
        label: "Name",
        value: FormatCurrency(details?.amount || 0),
      },
      {
        label: "Email",
        value: FormatCurrency(details?.tax || 0),
      },
      {
        label: "Mobile",
        value: FormatCurrency(details?.discount || 0),
      },
    ],
    className: "flex-1 h-full",
  };
  const deliver_address: GenericDataRowDetailCardInterface = {
    title: "Deliver To",
    data_rows: [
      {
        label: "House",
        value: FormatCurrency(details?.amount || 0),
      },
      {
        label: "Street",
        value: FormatCurrency(details?.tax || 0),
      },
      {
        label: "State",
        value: FormatCurrency(details?.discount || 0),
      },
    ],
    className: "flex-1 h-full",
  };

  return (
    <Container className="h-full pb-10 overflow-y-auto">
      <div className="w-full gap-4 pb-20 h-fit col-flex">
        <Card className="items-center justify-between row-flex">
          <div className="items-center gap-1 row-flex">
            <div className="font-medium ">Order ID</div>:
            <div className="text-sm">{details?.display_id}</div>
          </div>
        </Card>
        <div className="items-center w-full gap-4 row-flex">
          <GenericDataRowDetailCard {...customer_detail} />
          <GenericDataRowDetailCard {...deliver_address} />
          <GenericDataRowDetailCard {...order_summary} />
        </div>
        <div className="items-center gap-4 row-flex">
          <div className="w-2/3">
            <OrderItems {...{ items: orderItems }} />
          </div>
          <GenericDataRowDetailCard {...order_price} />
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailModule;
