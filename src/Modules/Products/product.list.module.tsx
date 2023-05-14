import GenericListing, {
  GenericListingInterface,
} from "@Composites/GenericListing/genericListing";
import { PRODUCT_API_ROUTE } from "@Constants/apiRoute.constant";
import {
  PRODUCT_CREATE_ROUTE,
  PRODUCT_EDIT_ROUTE,
} from "@Constants/route.constant";
import useNavigation from "@Hooks/useNavigation.hook";

const ProductListModule = () => {
  const { navigation } = useNavigation();

  const listing_props: GenericListingInterface = {
    name: "Product Lists",
    type: "products",
    actions: [
      {
        name: "Add New",
        action: () => {
          navigation({
            pathname: PRODUCT_CREATE_ROUTE,
          });
        },
        key: "add",
        outline: true,
      },
    ],
    table: {
      columns: [
        {
          name: "name",
          key: "title",
          renderValue: (item) => {
            return (
              <div
                onClick={() => {
                  navigation({
                    pathname: `${PRODUCT_EDIT_ROUTE}/${item.id}`,
                  });
                }}
                className="table-link"
              >
                {item?.title}
              </div>
            );
          },
        },
        {
          name: "status",
          key: "status",
        },
        {
          name: "Inventory",
          key: "stock",
          renderValue: (item: any) => {
            return (
              <div>
                {item?.stock} {item?.stock_unit?.name || ""}
              </div>
            );
          },
        },
        {
          name: "Status",
          key: "status",
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
