import { OrderTrackerTable } from "@/components";
import { OrderType, ScrollPosition } from "@/interfaces";
import styles from "./searchOrder.module.scss";
import { memo, useRef } from "react";
import { useScrollPosition, usePagination } from "@/hooks";

interface Props {
  orders: OrderType[];
}

let renders = 0;
const SearchOrder = ({ orders = [] }: Props) => {
  console.log("render order ", ++renders);
  const scrollPosition: ScrollPosition = useScrollPosition();
  const ordersContainer = useRef(null);
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

export default memo(SearchOrder);
