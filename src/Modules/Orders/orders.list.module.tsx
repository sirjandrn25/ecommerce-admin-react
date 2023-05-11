import GenericListing, {
  GenericListingInterface,
} from "@Composites/GenericListing/genericListing";
import { ORDER_DETAIL_ROUTE } from "@Constants/route.constant";

const OrderListModule = () => {
  const listing_props: GenericListingInterface = {
    name: "Orders Lists",
    type: "sub_orders",

    table: {
      columns: [
        {
          name: "Order Id",
          key: "order_id",
          url: (item: any) => `${ORDER_DETAIL_ROUTE}/${item.id}`,
        },

        {
          name: "Status",
          key: "status",
        },
        {
          name: "Payment Status",
          key: "payment_status",
        },
        {
          name: "Amount",
          key: "amount",
          type: "currency",
        },
        {
          name: "Date",
          key: "created_at",
        },
      ],
    },
  };

  return <GenericListing {...listing_props} />;
};

export default OrderListModule;
