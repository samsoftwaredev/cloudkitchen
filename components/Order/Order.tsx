import { OrderTrackerTable, Stats } from "@/components";
import { OrderEventType, OrderType } from "@/interfaces";
import styles from "./order.module.scss";
import { memo, useMemo } from "react";
interface Props {
  forwardedRef?: any;
  orders: OrderType[] | [];
}

let renders = 0;
const Order = ({ orders, forwardedRef }: Props) => {
  console.log("render order ", ++renders);

  // const findOrders = (eventType: OrderEventType) =>
  //   addComma(
  //     orders.filter(({ event_name }) => event_name === eventType).length
  //   );

  // const sumPrice = (data: OrderType[]) => {
  //   const startingCount = 0;
  //   const sum = (total: number, order: OrderType) => total + order.price;
  //   const total = data.reduce(sum, startingCount);
  //   return centsToUSD(total);
  // };

  return (
    <div ref={forwardedRef} className={styles.container}>
      {/* <div className={styles.statsContainer}>
        <Stats label={addComma(orders.length)} description="Orders" />
        <Stats label={sumPrice(orders)} description="Revenue" />
      </div>
      <div className={styles.statsContainer}>
        <Stats label={findOrders("CREATED")} description="Created" />
        <Stats label={findOrders("COOKED")} description="Cooked" />
        <Stats
          label={findOrders("DRIVER_RECEIVED")}
          description="Driver Received"
        />
        <Stats label={findOrders("DELIVERED")} description="Delivered" />
        <Stats label={findOrders("CANCELLED")} description="Cancelled" />
      </div> */}
      <OrderTrackerTable data={orders} />
    </div>
  );
};

export default memo(Order);
