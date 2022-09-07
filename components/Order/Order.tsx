import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { OrderTrackerTable, Stats } from "@/components";
import { OrderEventType, OrderType } from "@/interfaces/*";
import { addComma, centsToUSD } from "utils";
import styles from "./order.module.scss";
import { useEffect } from "react";

interface Props {
  orders: OrderType[] | [];
}

const pagination = {
  incrementBy: 100,
  end: 100,
  start: 0,
};

const Order = ({ orders }: Props) => {
  const [startPosition, setStartPosition] = useState(pagination.start);
  const [endPosition, setEndPosition] = useState(pagination.end);
  const [refTop, inViewTop] = useInView({ threshold: 0 });
  const [refBottom, inViewBottom] = useInView({ threshold: 0 });

  const findOrders = (eventType: OrderEventType) =>
    addComma(
      orders.filter(({ event_name }) => event_name === eventType).length
    );

  const sumPrice = (data: OrderType[]) => {
    const startingCount = 0;
    const sum = (total: number, order: OrderType) => total + order.price;
    const total = data.reduce(sum, startingCount);
    return centsToUSD(total);
  };

  const handleLoadMore = () => {
    let newStart = 0;
    let newEnd = endPosition + pagination.incrementBy;
    const bottomGap = 500;
    const numOfOrders = 300;
    const hasLongList = endPosition >= numOfOrders;

    if (hasLongList) {
      newStart = endPosition - pagination.incrementBy;
      newEnd = endPosition + pagination.incrementBy;
    }
    if (newEnd >= orders.length) {
      newEnd = orders.length;
    } else {
      // scroll up
      window.scroll({
        top: window.scrollY - bottomGap,
        behavior: "smooth",
      });
    }
    setStartPosition(newStart);
    setEndPosition(newEnd);
  };

  const handleLoadPrev = () => {
    const topGap = 500;
    let loadPrevOrders = startPosition - pagination.incrementBy;
    let newEnd = startPosition;

    if (loadPrevOrders <= pagination.start) {
      loadPrevOrders = pagination.start;
      newEnd = pagination.end;
    } else {
      window.scroll({
        top: topGap,
        behavior: "smooth",
      });
    }

    setStartPosition(loadPrevOrders);
    setEndPosition(newEnd);
  };

  useEffect(() => {
    const finishLoading = orders.length >= pagination.end;
    const positionAtEnd = endPosition >= orders.length;

    if (inViewBottom && finishLoading && !positionAtEnd) handleLoadMore();
  }, [inViewBottom]);

  useEffect(() => {
    const finishLoading = orders.length >= pagination.end;
    const positionIsAtStart = startPosition <= pagination.start;

    if (inViewTop && finishLoading && !positionIsAtStart) handleLoadPrev();
  }, [inViewTop]);

  return (
    <div className="contentContainer">
      <div className={styles.statsContainer}>
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
      </div>
      <div className={styles.topOfTableContainer}>
        <div className={styles.topOfTable} ref={refTop}>
          Top div{" "}
        </div>
        <OrderTrackerTable data={orders.slice(startPosition, endPosition)} />
      </div>
      <div ref={refBottom} />
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default Order;
