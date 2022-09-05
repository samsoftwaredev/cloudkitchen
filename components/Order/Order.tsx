import { OrderTrackerTable, SearchSection, Stats } from "@/components";
import { useEffect, useState } from "react";
import { addComma, centsToUSD } from "utils";
import { OrderEventType, OrderType } from "@/interfaces/*";
import styles from "./order.module.scss";

interface Props {
  orders: OrderType[] | [];
}

const Order = ({ orders }: Props) => {
  const [data, setData] = useState(orders);
  // const data = useMemo(
  //   () => orders
  //   [orders]
  // );

  const updateTableFields = (query: string) => {
    let newData = [];
    const queryLC = query.toLowerCase();
    const noMatch = [
      {
        customer: "No Match",
        destination: "No Match",
        event_name: "No Match",
        id: "No Match",
        item: "No Match",
        price: 0,
        sent_at_second: 0,
      },
    ];

    const ordersFound = orders.filter((order) => {
      if (order.id.toLowerCase().includes(queryLC)) return order;
      if (order.customer.toLowerCase().includes(queryLC)) return order;
      if (order.destination.toLowerCase().includes(queryLC)) return order;
      if (order.event_name.toLowerCase().includes(queryLC)) return order;
      if (order.item.toLowerCase().includes(queryLC)) return order;
      if (order.sent_at_second.toString().includes(queryLC)) return order;
      if (
        order.price.toString().includes(queryLC) ||
        centsToUSD(order.price).toString().includes(queryLC)
      )
        return order;
    });

    // show "NoMatch" content if no order were found
    if (ordersFound.length === 0) newData = noMatch;
    // show list of orders as user types
    else newData = query.length === 0 ? orders : ordersFound;

    setData(newData);
  };

  const findOrders = (eventType: OrderEventType) =>
    addComma(data.filter(({ event_name }) => event_name === eventType).length);

  const sumPrice = (data: OrderType[]) => {
    const startingCount = 0;
    const sum = (total: number, order: OrderType) => total + order.price;
    const total = data.reduce(sum, startingCount);
    return centsToUSD(total);
  };

  useEffect(() => {
    setData(orders);
  }, [orders]);

  return (
    <div className="contentContainer">
      <div className={styles.statsContainer}>
        <Stats label={addComma(data.length)} description="Orders" />
        <Stats label={sumPrice(data)} description="Revenue" />
      </div>
      <div className={styles.statsContainer}>
        <Stats label={findOrders("COOKED")} description="Cooked" />
        <Stats label={findOrders("CREATED")} description="Created" />
        <Stats label={findOrders("CANCELLED")} description="Cancelled" />
        <Stats label={findOrders("DELIVERED")} description="Delivered" />
        <Stats
          label={findOrders("DRIVER_RECEIVED")}
          description="Driver Received"
        />
      </div>
      <SearchSection onChange={updateTableFields} />
      <OrderTrackerTable data={data} />
    </div>
  );
};

export default Order;
