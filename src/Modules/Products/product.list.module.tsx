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
    end_point: PRODUCT_API_ROUTE,
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
