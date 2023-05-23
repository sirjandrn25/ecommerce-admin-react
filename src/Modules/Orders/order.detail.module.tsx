import Card from "@Components/Card/card.component";
import {
  GenericDataRowDetailCard,
  GenericDataRowDetailCardInterface,
} from "@Components/Card/dataRow.component";
import Container from "@Components/Container/container.component";
import useNavigation from "@Hooks/useNavigation.hook";
import {
  Capitalize,
  FormatDisplayDate,
  getPaymentMethod,
} from "@Utils/common.utils";
import { FormatCurrency } from "@Utils/currency.utils";
import { useMemo } from "react";
import OrderItems from "./Components/orderItems.component";
import OrderStatusChange from "./Components/orderStatusChange.component";
import useOrderDetail from "./Hooks/useOrderDetail.hook";

const OrderDetailModule = () => {
  const { id } = useNavigation();

  const { details, isLoading, orderItems, handleStatusChange, total_amount } =
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
        value: getPaymentMethod(details?.payment_by),
      },
      {
        label: "Shipping Method",
        value: details?.payment_by,
      },
    ],
    className: "flex-1 ",
  };
  const total_payable = useMemo(() => {
    return total_amount + 20 + (details?.tax || 0) + (details?.discount || 0);
  }, [details?.discount, details?.tax, total_amount]);
  const { shipping_address, customer } = details?.order || {};
  const order_price: GenericDataRowDetailCardInterface = {
    title: "Order Price",
    data_rows: [
      {
        label: "Total Amount",
        value: FormatCurrency(total_amount || 0),
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

  return (
    <Container className="h-full pb-10 overflow-y-auto">
      <div className="w-full gap-4 pb-20 h-fit col-flex">
        <Card className="items-center justify-between row-flex">
          <div className="items-center gap-1 row-flex">
            <div className="font-medium ">Order ID</div>:
            <div className="text-sm">{details?.display_id}</div>
          </div>
          <OrderStatusChange {...{ handleStatusChange, ...details }} />
        </Card>
        <div className="items-center w-full gap-4 row-flex">
          <CustomerInfo
            {...{ ...customer, mobile: shipping_address?.mobile }}
          />
          <DeliveryAddress {...{ shipping_address }} />
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

const DeliveryAddress = ({ shipping_address }: any) => {
  const deliver_address: GenericDataRowDetailCardInterface = {
    title: "Deliver To",
    data_rows: [
      {
        label: "Address",
        value: shipping_address?.address,
      },
      {
        label: "City",
        value: shipping_address?.city,
      },
      {
        label: "State",
        value: shipping_address?.provinance,
      },
    ],
    className: "flex-1 h-full",
  };
  return <GenericDataRowDetailCard {...deliver_address} />;
};

const CustomerInfo = ({ first_name, last_name, mobile, email }: any) => {
  const fullName = useMemo(() => {
    return `${Capitalize(first_name)} ${Capitalize(last_name)}`;
  }, [first_name, last_name]);
  const customer_detail: GenericDataRowDetailCardInterface = {
    title: "Customer Details",
    data_rows: [
      {
        label: "Name",
        value: fullName,
      },
      {
        label: "Email",
        value: email,
      },
      {
        label: "Mobile",
        value: mobile,
      },
    ],
    className: "flex-1 h-full",
  };
  return <GenericDataRowDetailCard {...customer_detail} />;
};

export default OrderDetailModule;
