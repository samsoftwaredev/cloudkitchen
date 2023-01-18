import { OrderTrackerTable } from "@/components";
import { OrderType, ScrollPosition } from "@/interfaces";
import styles from "./order.module.scss";
import { memo, useRef } from "react";
import { useScrollPosition, usePagination } from "@/hooks";
interface Props {
  orders: OrderType[];
}

let renders = 0;
const Order = ({ orders = [] }: Props) => {
  console.log("render order ", ++renders);
  const scrollPosition: ScrollPosition = useScrollPosition();
  const ordersContainer = useRef<HTMLDivElement>(null);
  const viewportData: OrderType[] = usePagination({
    data: orders,
    scrollPosition,
    ordersElement: ordersContainer,
  });

  return (
    <div ref={ordersContainer} className={styles.container}>
      <OrderTrackerTable data={viewportData} />
    </div>
  );
};

export default memo(Order);
