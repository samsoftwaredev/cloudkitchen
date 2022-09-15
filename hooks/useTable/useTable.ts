import { TableProps } from "interfaces";
import { css, generateUID, clickable } from "utils";

const useTable = ({ columns, data, setProps }: TableProps) => {
  const getTableProps = () => ({ ...setProps?.getTableProps });

  const getTableBodyProps = () => ({ ...setProps?.getTableBodyProps });

  const getTableHeadProps = () => ({ ...setProps?.getTableHeadProps });

  const prepareRow = (row: any) => {};

  const headerGroups = [
    {
      id: generateUID(),
      getHeaderGroupProps: () => ({
        ...setProps?.getHeaderGroupProps,
      }),
      headers: columns.map((c, index) => ({
        id: generateUID() + index,
        getHeaderProps: () => ({
          ...setProps?.getHeaderProps,
        }),
        render: (type: string) => c.Header,
      })),
    },
  ];

  const rows = data.map((row, rowIndex) => ({
    id: generateUID() + rowIndex,
    getRowProps: () => ({
      ...setProps?.getRowProps,
      onClick: () => clickable(setProps?.getRowProps, row),
    }),
    cells: Object.entries(row).map(([key, value], cellIndex) => {
      return {
        id: generateUID() + cellIndex,
        render: (type: string) => value,
        getCellContentProps: () => ({
          className: css([
            columns[cellIndex % (columns.length - 1)]?.cell?.className!,
          ]),
        }),
        getCellProps: () => ({
          id: generateUID(),
          ...setProps?.getCellProps,
          className: css([setProps?.getCellProps?.className]),
          onClick: () =>
            clickable(setProps?.getCellProps, { cell: key, value, row }),
        }),
      };
    }),
  }));

  return {
    getTableProps,
    getTableBodyProps,
    getTableHeadProps,
    headerGroups,
    rows,
    prepareRow,
  };
};

export default useTable;
