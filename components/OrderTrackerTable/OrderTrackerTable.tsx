import { Table, Drawer, OrderContent } from "@/components";
import { OrderType } from "@/interfaces";
import { memo, useMemo, useState } from "react";
import { centsToUSD, getOrderStatus, getTimeDifference } from "@/utils";
import styles from "./orderTrackerTable.module.scss";

interface Props {
  data?: OrderType[];
}

let renders = 0;
const OrderTrackerTable = ({ data = [] }: Props) => {
  console.log("render order table ", ++renders);
  const [drawerData, setDrawerData]: [OrderType | null, Function] =
    useState(null);

  const tableProps = useMemo(
    () => ({
      getTableProps: { className: styles.table },
      getTableBodyProps: { className: styles.tableBody },
      getHeaderGroupProps: { className: styles.headerGroup },
      getTableHeadProps: { className: styles.tableHead },
      getHeaderProps: { className: styles.header },
      getRowProps: {
        className: styles.row,
        onClick: (rowData: OrderType) => {
          setDrawerData(null);
          let time = 0;
          time = window.setTimeout(() => {
            const order = data.find((d) => d.id === rowData.id);
            setDrawerData(order);
            clearTimeout(time);
          }, 200);
        },
      },
      getCellProps: {
        className: styles.cell,
      },
    }),
    [data]
  );

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "index",
      },
      {
        Header: "ID",
        accessor: "id",
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

  const formatData = useMemo(() => {
    return data.map((d) => ({
      index: d.index,
      id: d.id,
      status: getOrderStatus(d.event_name).toUpperCase(),
      item: d.item,
      price: centsToUSD(d.price),
      time: getTimeDifference(d.sent_at_second),
    }));
  }, [data]);

  const onDrawerClose = () => setDrawerData(null);

  return (
    <>
      <Drawer isOpen={!!drawerData} onClose={onDrawerClose}>
        <OrderContent data={drawerData} />
      </Drawer>
      <Table data={formatData} columns={columns} setProps={tableProps} />
    </>
  );
};

export default memo(OrderTrackerTable);
