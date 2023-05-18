import Card from "@Components/Card/card.component";
import GenericTable, {
  ColumnInterface,
  GenericTableProps,
} from "@Composites/GenericTable/genericTable.component";
import React from "react";

const OrderItems = ({ items = [] }: any) => {
  const columns: ColumnInterface[] = [
    {
      name: "Product Image",
      key: "order_item.product.thumbnail",
      type: "image",
    },
    {
      name: "Product Name",
      key: "order_item.product.title",
    },
    {
      name: "Product Variant",
      key: "order_item.product_variant.title",
    },
    {
      name: "Quantity",
      key: "order_item.quantity",
    },
    {
      name: "Price",
      key: "order_item.unit_price",
      type: "currency",
    },
  ];
  return (
    <div className="gap-2 bg-base-200 col-flex">
      <div className="text-lg font-semibold">Order Items Information</div>
      <GenericTable
        {...{ columns, data: items }}
        enablelocalPagination={false}
      />
    </div>
  );
};

export default OrderItems;
