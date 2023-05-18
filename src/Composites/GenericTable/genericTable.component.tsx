import ActionMenu from "@Components/ActionMenu/actionMenu.component";
import Avatar from "@Components/Avatar/avatar.component";
import Icon from "@Components/Icon/icon.component";
import {
  SortUpDownArrow,
  SortArrowDown,
  SortArrowUp,
  TableRowIcon,
  ArrowChevronRight,
  ArrowChevronLeft,
} from "@Constants/imageMapping.constants";
import {
  FormatDisplayDate,
  GetObjectPrefixValue,
  IsFunction,
  IsUndefined,
} from "@Utils/common.utils";
import { FormatCurrency } from "@Utils/currency.utils";
import Link from "next/link";
import { useState } from "react";

export interface ColumnInterface {
  name: string;
  key: string;
  type?: "date" | "date_time" | "currency" | "stock" | "image" | string;
  sort?: boolean;
  className?: string;
  renderValue?: (data: any) => any;
  isVisible?: boolean;
  url?: string | ((item: any) => string);
}

export interface RowActionInterface {
  name: string;
  key: any;
  action?: (data: any) => any;
  url?: (data: any) => string | string;
  isVisible?: (data: any) => any | boolean;
}

export type GenericTableProps = {
  columns: ColumnInterface[];
  data?: any[];
  rowActions?: RowActionInterface[];
  enablelocalPagination?: boolean;
  enableNumbering?: boolean;
  isZebraTable?: boolean;
  loading?: boolean;
};

const GenericTable = ({
  columns,
  data = [],
  rowActions = [],
  enablelocalPagination = false,
  enableNumbering = false,
  isZebraTable = false,
  loading = false,
}: GenericTableProps) => {
  const [sortInfo, setSortInfo] = useState<any>();
  const [filterState, setFilterState] = useState<any>({
    limit: 5,
    page: 1,
  });
  const handleFilterChange = (key: any, value: any) => {
    setFilterState((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const filterData = (() => {
    const { limit, page } = filterState;
    if (!limit || !page) return data;
    const start = limit * (page - 1);

    const end = start + limit;

    return data.slice(start, end);
  })();

  const sortedData = (() => {
    if (!sortInfo || !filterData || !filterData.length) return filterData;

    const { key, order, type } = sortInfo;
    const sort_data = [...filterData];
    switch (type || typeof data[0][key]) {
      case "number":
        sort_data.sort((prev: any, next: any) => {
          return prev[key] - next[key];
        });
        break;
      case "date":
        sort_data.sort((prev: any, next: any) => {
          return (new Date(prev[key]) as any) - (new Date(next[key]) as any);
        });
        break;
      default:
        sort_data.sort((prev: any, next: any) => {
          return prev[key].localeCompare(next[key]);
        });
    }
    if (order === "desc") return [...sort_data.reverse()];
    return [...sort_data];
  })();

  const handleSortInfoData = (key: any, type: any) => {
    if (!sortInfo || sortInfo.key !== key) {
      setSortInfo({
        key,
        type,
        order: "asc",
      });
      return;
    }
    if (sortInfo.order === "desc") setSortInfo(null);
    else
      setSortInfo({
        key,
        type,
        order: "desc",
      });
  };
  const renderSortIcon = (key: string) => {
    if (!sortInfo || sortInfo.key !== key) return SortUpDownArrow;

    if (sortInfo.key === key) {
      if (sortInfo.order === "asc") return SortArrowDown;
      return SortArrowUp;
    }
    return SortUpDownArrow;
  };

  const TableHeader = () => {
    return (
      <tr className=" bg-base-200">
        {enableNumbering && (
          <th scope="col" className="w-10">
            #
          </th>
        )}
        {columns.map((column: any, index: number) => {
          if (column.isVisible === false) return;
          return (
            <th
              scope="col"
              className={`text-xs ${column.className} ${
                column.sort ? "hover:cursor-pointer" : ""
              } `}
              onClick={() =>
                column.sort && handleSortInfoData(column.key, column.type)
              }
              key={index}
            >
              <div className="flex items-center justify-between w-full uppercase">
                <div>{column.name}</div>{" "}
                {column.sort && (
                  <Icon
                    source={renderSortIcon(column.key)}
                    isReactIcon
                    size={16}
                  />
                )}
              </div>
            </th>
          );
        })}
        {rowActions.length !== 0 && <th className="w-10"></th>}
      </tr>
    );
  };

  const getRowDropDownOptions = (item: any) => {
    return rowActions.map((row) => {
      const { name, key, url, action, isVisible } = row;
      return {
        name,
        key: key,
        url: url ? (typeof url === "string" ? url : url(item)) : undefined,
        action: (value: any) => (action ? action(item) : null),
        isVisible: isVisible
          ? typeof isVisible === "boolean"
            ? isVisible
            : isVisible(item)
          : undefined,
      };
    });
  };

  const parseToUrl = (item: any, column: any) => {
    if (IsFunction(column.url)) return column.url(item);
    return column?.url;
  };

  const parseColumnItem = (item: any, column: any) => {
    const value = GetObjectPrefixValue(item, column.key);

    if (IsFunction(column?.renderValue)) return column?.renderValue(item);
    //parse url value
    let columnValue: any;
    if (IsUndefined(value)) return "-";
    switch (column.type) {
      case "currency":
        columnValue = FormatCurrency(value || 0);
        break;
      case "date":
        columnValue = FormatDisplayDate(value);
        break;
      case "stock":
        break;
      case "image":
        columnValue = <Avatar image={value} size="sm" shape="circle" />;
        break;

      default:
        columnValue = value;
    }
    if (column?.url) {
      return (
        <div className="text-info hover:underline">
          <Link href={parseToUrl(item, column)}>{columnValue}</Link>
        </div>
      );
    }
    return columnValue;
  };

  const TableRow = ({ row, idx }: any) => {
    return (
      <tr className={`${isZebraTable && "even:bg-base-200 odd:bg-base-100"}`}>
        {enableNumbering && <td className="">{idx + 1}</td>}
        {columns.map((column: any, index: any) => {
          if (column.isVisible === false) return;
          return (
            <td className={`${column.className}`} key={index}>
              {parseColumnItem(row, column)}
            </td>
          );
        })}
        {rowActions.length !== 0 && (
          <td className="">
            <ActionMenu
              actions={getRowDropDownOptions(row)}
              displayLabel={<Icon source={TableRowIcon} isReactIcon />}
              direction="left"
            />
          </td>
        )}
      </tr>
    );
  };

  const PaginationComponent = () => {
    const totalPages = Math.round(data.length / (filterState?.limit || 1));
    return (
      <div className="flex items-center gap-2 bg-base-100 text-neutral ">
        <Icon
          source={ArrowChevronLeft}
          isReactIcon
          iconColor={`text-neutral/60 ${
            filterState.page <= 1 && "cursor-not-allowed text-base-300"
          }`}
          onClick={() => {
            filterState.page > 1 &&
              handleFilterChange("page", filterState.page - 1);
          }}
        />

        <div>
          Page {filterState.page} out of {totalPages || 1}
        </div>

        <Icon
          source={ArrowChevronRight}
          iconColor={`text-neutral/60 ${
            filterState.page >= totalPages && "text-base-300 cursor-not-allowed"
          }`}
          isReactIcon
          onClick={() => {
            filterState.page < totalPages &&
              handleFilterChange("page", filterState.page + 1);
          }}
        />
      </div>
    );
  };

  const LimitComponent = () => {
    return (
      <div className="flex items-center w-auto gap-4">
        <select
          onChange={(e: any) => {
            if (!e.target.value) return;
            handleFilterChange("limit", +e.target?.value);
          }}
          className="px-3 py-2 border rounded-md"
        >
          <option value={5} selected={filterState.limit === 5}>
            5
          </option>
          <option value={10} selected={filterState.limit === 10}>
            10
          </option>
          <option value={20} selected={filterState.limit === 20}>
            20
          </option>
          <option value={30} selected={filterState.limit === 30}>
            30
          </option>
          <option value={50} selected={filterState.limit === 50}>
            50
          </option>
        </select>
        <div>
          {filterData.length} items show Out of {data.length}
        </div>
      </div>
    );
  };

  return (
    <div className={`generic_table_wrapper min-h-[250px]`}>
      <table className="min-w-full leading-normal ">
        <thead className="">
          <TableHeader />
        </thead>
        <tbody className="text-sm bg-base-100">
          {sortedData.map((data: any, idx: number) => (
            <TableRow row={data} idx={idx} key={idx} />
          ))}
        </tbody>
      </table>
      {!loading && !data.length && (
        <div className="min-h-[250px] bg-base-100 w-full flex items-center justify-center">
          No Data Found !!!
        </div>
      )}
      {loading && (
        <div className="min-h-[250px] bg-base-100 w-full flex items-center justify-center">
          loading data !!!
        </div>
      )}
      {enablelocalPagination && !!data.length && (
        <div className="flex items-center justify-between px-4 py-2 text-sm text-neutral">
          <LimitComponent />
          <PaginationComponent />
        </div>
      )}
    </div>
  );
};

export default GenericTable;
