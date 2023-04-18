import React from "react";
import useGenericListing from "./Hooks/useGenericListing.hook";
import Container from "@Components/Container/container.component";
import GenericTable, {
  GenericTableProps,
} from "@Composites/GenericTable/genericTable.component";

export interface GenericListingInterface {
  filter?: any;
  end_point: string;
  name: string;
  table: GenericTableProps;
}

const GenericListing = ({
  table,
  end_point,
  name,
  filter,
}: GenericListingInterface) => {
  const { isLoading, filters, setFilters, pagination, setPagination, data } =
    useGenericListing({ end_point });
  return (
    <Container>
      <div className="flex flex-col w-full h-full gap-4 ">
        <div className="flex items-center justify-between w-full gap-4 p-4 rounded bg-base-100">
          <div className="font-medium capitalize">{name}</div>
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
