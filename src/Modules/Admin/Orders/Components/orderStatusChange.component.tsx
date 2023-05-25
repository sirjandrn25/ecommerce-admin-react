import Button from "@Components/Button/button.component";
import { FormInterface } from "@Composites/FormBuilder/Types/form.types";
import FormBuilder from "@Composites/FormBuilder/formBuilder";
import { useEffect, useRef } from "react";

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

const OrderStatusChange = ({
  payment_status,
  status,
  handleStatusChange,
}: any) => {
  const formRef = useRef<any>(null);

  useEffect(() => {
    const current = formRef?.current;
    if (!current || !payment_status || !status) return;
    current?.setFormData((prev: any) => {
      return {
        ...prev,
        payment_status,
        status,
      };
    });
  }, [formRef, payment_status, status]);

  const formSchema: FormInterface = {
    fields: [
      {
        name: "status",
        type: "select",
        placeholder: "Choose Order status",
        options: orderStatus,
      },
      {
        name: "payment_status",
        type: "select",
        placeholder: "Choose Order status",
        options: OrderPaymentStatus,
      },
    ],
    data: { payment_status, status },
    handleSubmit: handleStatusChange,
    layout: "two",
    className: "!row-flex items-center !p-0",
  };

  return (
    <div className="items-center gap-4 row-flex">
      <FormBuilder ref={formRef} {...formSchema}>
        {({ onSubmit }) => {
          return (
            <div className="items-center row-flex">
              <Button
                size="sm"
                color="success"
                onClick={onSubmit}
                progress
                outline
              >
                Save
              </Button>
            </div>
          );
        }}
      </FormBuilder>
    </div>
  );
};

export default OrderStatusChange;
