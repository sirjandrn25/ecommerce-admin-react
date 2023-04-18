import GenericListing, {
  GenericListingInterface,
} from "@Composites/GenericListing/genericListing";
import { PRODUCT_API_ROUTE } from "@Constants/apiRoute.constant";
import useProductList from "./Hooks/useProductList.module";

const ProductListModule = () => {
  const listing_props: GenericListingInterface = {
    name: "Product Lists",
    end_point: PRODUCT_API_ROUTE,
    table: {
      columns: [
        {
          name: "name",
          key: "title",
        },
        {
          name: "status",
          key: "status",
        },
        {
          name: "Inventory",
          key: "inventory",
          renderValue: (item: any) => {
            const quantiy = item?.variants?.reduce(
              (acc: number, value: any) => {
                return acc + value?.stock || 0;
              },
              0
            );
            return <div>{quantiy}</div>;
          },
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

export default ProductListModule;
