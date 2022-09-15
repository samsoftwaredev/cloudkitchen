import useTable from "@/hooks/useTable";
import { TableProps } from "interfaces";
import { memo } from "react";

let renders = 0;
const Table = ({ columns, data, setProps }: TableProps) => {
  console.log("render table ", ++renders);
  const {
    getTableProps,
    getTableBodyProps,
    getTableHeadProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data, setProps });

  return (
    <table {...getTableProps()}>
      <thead {...getTableHeadProps()}>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={column.id} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row.id} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td key={cell.id} {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default memo(Table);
