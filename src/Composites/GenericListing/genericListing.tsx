import React from "react";
import useGenericListing from "./Hooks/useGenericListing.hook";
import Container from "@Components/Container/container.component";
import GenericTable, {
  GenericTableProps,
} from "@Composites/GenericTable/genericTable.component";
import Button from "@Components/Button/button.component";

interface ActionInterface {
  name: string;
  key: string;
  action: () => void;
  appearance?: "primary" | "secondary" | "accent";
  outline?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
}

export interface GenericListingInterface {
  filter?: any;
  end_point: string;
  name: string;
  table: GenericTableProps;
  actions?: ActionInterface[];
}

const GenericListing = ({
  table,
  end_point,
  name,
  filter,
  actions = [],
}: GenericListingInterface) => {
  const { isLoading, filters, setFilters, pagination, setPagination, data } =
    useGenericListing({ end_point });
  return (
    <Container>
      <div className="flex flex-col w-full h-full gap-4 ">
        <div className="flex items-center justify-between w-full gap-4 p-4 rounded bg-base-100">
          <div className="font-medium capitalize">{name}</div>
          <div className="gap-4 row-flex">
            {actions?.map((action) => {
              return (
                <Button
                  className="capitalize"
                  color={action?.appearance}
                  key={action?.key}
                  onClick={() => action?.action()}
                  size={action?.size || "sm"}
                  outline={action?.outline}
                >
                  {action.name}
                </Button>
              );
            })}
          </div>
        </div>
        <Filter />
        <GenericTable
          {...{
            loading: isLoading,

            enablelocalPagination: true,
            pagination: pagination,
            ...table,
            data: data,
            className: "bg-base-100",
          }}
        />
      </div>
    </Container>
  );
};

const Filter = () => {
  return <div className="p-4 rounded bg-base-100">Filter Component</div>;
};

export default GenericListing;
