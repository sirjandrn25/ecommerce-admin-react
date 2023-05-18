import Card from "@Components/Card/card.component";
import SelectBox from "@Components/SelectBox/selecBox.component";
import { FormInterface } from "@Composites/FormBuilder/Types/form.types";
import FormBuilder from "@Composites/FormBuilder/formBuilder";
import React, { useState } from "react";
import { useUpdateEffect } from "react-use";

const orderStatus = [
  {
    label: "PENDING",
    value: "PENDING",
  },

  {
    label: "PROCESSING",
    value: "PROCESSING",
  },
  {
    label: "PACKAGING",
    value: "PACKAGING",
  },
  {
    label: "SHIPPING",
    value: "SHIPPING",
  },
  {
    label: "DELIVERED",
    value: "DELIVERED",
  },
  {
    label: "CANCELED",
    value: "CANCELED",
  },
];

// enum PaymentStatus {
//   UNPAID
//   PAID
//   PARTIALLY_PAID
//   PARTIALLY_REFUNDED
//   ADVANCED
//   REFUNDED
//   CANCELED
// }

const OrderPaymentStatus = [
  {
    label: "UNPAID",
    value: "UNPAID",
  },
  {
    label: "PAID",
    value: "PAID",
  },
  {
    label: "PARTIALLY PAID",
    value: "PARTIALLY_PAID",
  },
  {
    label: "PARTIALLY REFUNDED",
    value: "PARTIALLY_REFUNDED",
  },
  {
    label: "REFUNDED",
    value: "REFUNDED",
  },
  {
    label: "CANCELED",
    value: "CANCELED",
  },
];

const OrderStatusChange = ({ value }: any) => {
  const [info, setInfo] = useState<any>(value);

  const formSchema: FormInterface = {
    fields: [
      {
        label: "Status",
        name: "status",
        type: "select",
        placeholder: "Choose Order status",
        options: orderStatus,
      },
      {
        label: "Payment Status",
        name: "payment_status",
        type: "select",
        placeholder: "Choose Order status",
        options: OrderPaymentStatus,
      },
    ],
  };

  useUpdateEffect(() => {}, [info]);
  return (
    <Card title="Order Status">
      <FormBuilder {...formSchema} />
    </Card>
  );
};

export default OrderStatusChange;
