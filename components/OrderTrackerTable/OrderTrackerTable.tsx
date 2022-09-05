import { Table, Drawer, OrderContent } from "@/components";
import { OrderType } from "@/interfaces/*";
import { useMemo, useState } from "react";
import { centsToUSD } from "utils";
import { getTimeDifference } from "utils/time";
import styles from "./orderTrackerTable.module.scss";

interface Props {
  data?: OrderType[];
  onRowClick?: Function;
}

const OrderTrackerTable = ({ data = [] }: Props) => {
  const [drawerData, setDrawerData]: [OrderType | null, Function] =
    useState(null);

  const tableProps = {
    getTableProps: { className: styles.table },
    getTableBodyProps: { className: styles.tableBody },
    getHeaderGroupProps: { className: styles.headerGroup },
    getHeaderProps: { className: styles.header },
    getRowProps: {
      className: styles.row,
      onClick: (rowData: OrderType) => {
        setDrawerData(null);

        setTimeout(() => {
          setDrawerData(rowData);
        }, 100);
      },
    },
    getCellProps: {
      className: styles.cell,
    },
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Customer",
        accessor: "customer",
      },
      {
        Header: "Destination",
        accessor: "destination",
      },
      {
        Header: "Status",
        accessor: "event_name",
        cell: {
          className: styles.status,
        },
      },
      {
        Header: "Article",
        accessor: "item",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Time",
        accessor: "sent_at_second",
      },
    ],
    []
  );

  const formatData = (data: OrderType[]) =>
    data.map((d) => ({
      id: d.id,
      customer: d.customer,
      destination: d.destination,
      status: d.event_name,
      item: d.item,
      price: centsToUSD(d.price),
      time: getTimeDifference(d.sent_at_second),
    }));

  return (
    <>
      <Drawer isOpen={!!drawerData}>
        <OrderContent data={drawerData} />
      </Drawer>
      <Table data={formatData(data)} columns={columns} setProps={tableProps} />
    </>
  );
};

export default OrderTrackerTable;
