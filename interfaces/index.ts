export type NavType = "main" | "app";

export type OrderEventType =
  | "CREATED"
  | "COOKED"
  | "DRIVER_RECEIVED"
  | "DELIVERED"
  | "CANCELLED";

export type scrollState = "top" | "middle" | "bottom";

export type scrollDirection = "up" | "down";

export type ScrollPosition = { state: scrollState; direction: scrollDirection };

export type Pagination = {
  incrementBy: number;
  startingPosition: number;
  endingPosition: number;
  minGap: number;
  maxGap: number;
  cellHeight: number;
};

export type OrderType = {
  index?: number;
  customer: string;
  destination: string;
  event_name: OrderEventType;
  id: string;
  item: string;
  price: number;
  sent_at_second: number;
  orderHistory?: Array<OrderType>;
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
