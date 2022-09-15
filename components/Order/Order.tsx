import { OrderTrackerTable } from "@/components";
import { OrderType } from "@/interfaces";
import styles from "./order.module.scss";
import { memo } from "react";
interface Props {
  forwardedRef?: any;
  orders: OrderType[] | [];
}

let renders = 0;
const Order = ({ orders, forwardedRef }: Props) => {
  console.log("render order ", ++renders);

  return (
    <div ref={forwardedRef} className={styles.container}>
      <OrderTrackerTable data={orders} />
    </div>
  );
};

export default memo(Order);
