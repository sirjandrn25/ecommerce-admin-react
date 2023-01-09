import React from "react";
import { useTable } from "react-table";
import type { ColumnInterface } from "react-table";

const GenericTable = () => {
	const data = React.useMemo(
		() => [
			{
				col1: "Hello",
				col2: "World",
			},
			{
				col1: "react-table",
				col2: "rocks",
			},
			{
				col1: "whatever",
				col2: "you want",
			},
		],
		[]
	);
	const columns: ColumnInterface[] = React.useMemo(
		() => [
			{
				Header: "Column 1",
				accessor: "col1", // accessor is the "key" in the data
			},
			{
				Header: "Column 2",
				accessor: "col2",
			},
		],
		[]
	);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns: columns, data });

	return (
		<table {...getTableProps()}>
			<thead>
				{
					// Loop over the header rows
					headerGroups.map((headerGroup, index: number) => (
						// Apply the header row props
						<tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{
								// Loop over the headers in each row
								headerGroup.headers.map((column, index) => (
									// Apply the header cell props
									<th
										{...column.getHeaderProps()}
										key={index}
									>
										{
											// Render the header
											column.render("Header")
										}
									</th>
								))
							}
						</tr>
					))
				}
			</thead>
		</table>
	);
};

export default GenericTable;
