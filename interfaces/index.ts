export type NavType = "main" | "app";

export type OrderEventType =
  | "CREATED"
  | "COOKED"
  | "DRIVER_RECEIVED"
  | "DELIVERED"
  | "CANCELLED";

export type OrderType = {
  index?: number;
  customer: string;
  destination: string;
  event_name: string;
  id: string;
  item: string;
  price: number;
  sent_at_second: number;
};

export type TableHeaderType = {
  accessor: string;
  Header: string;
  columns?: TableHeaderType[];
  cell?: { className: string };
};

export interface TableProps {
  columns: TableHeaderType[];
  data: { [key: string]: string | number | null | undefined }[];
  setProps?: {
    getTableProps?: any;
    getTableBodyProps?: any;
    getHeaderGroupProps?: any;
    getHeaderProps?: any;
    getRowProps?: any;
    getCellProps?: any;
    getTableHeadProps?: any;
  };
}

export interface NavbarProps {
  navLinks: { value: string; label: string; link: string }[];
}
