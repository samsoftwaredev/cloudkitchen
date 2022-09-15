import type { NextPage } from "next";
import { AppLayout, Order, Stats } from "@/components";
import { OrderEventType, OrderType, ScrollPosition } from "@/interfaces";
import { useRef } from "react";
import { useScrollPosition, useSocket, usePagination } from "@/hooks";
import { addComma } from "utils";

let renders = 0;
const App: NextPage = () => {
  console.log("************** render app **************", ++renders);
  const data: OrderType[] = useSocket(3000);
  const scrollPosition: ScrollPosition = useScrollPosition();
  const ordersContainer = useRef();
  const viewportData: OrderType[] = usePagination({
    data,
    scrollPosition,
    ordersContainer,
  });

  // const updateTableFields = (query: string) => {
  //   let newData = [];
  //   const queryLC = query.toLowerCase();
  //   const noMatch = [
  //     {
  //       customer: "No Match",
  //       destination: "No Match",
  //       event_name: "No Match",
  //       id: "No Match",
  //       item: "No Match",
  //       price: 0,
  //       sent_at_second: 0,
  //     },
  //   ];

  //   const ordersFound = orders.filter((order) => {
  //     if (order.id.toLowerCase().includes(queryLC)) return order;
  //     if (order.customer.toLowerCase().includes(queryLC)) return order;
  //     if (order.destination.toLowerCase().includes(queryLC)) return order;
  //     if (order.event_name.toLowerCase().includes(queryLC)) return order;
  //     if (order.item.toLowerCase().includes(queryLC)) return order;
  //     if (order.sent_at_second.toString().includes(queryLC)) return order;
  //     if (
  //       order.price.toString().includes(queryLC) ||
  //       centsToUSD(order.price).toString().includes(queryLC)
  //     )
  //       return order;
  //   });

  //   // show "NoMatch" content if no order were found
  //   if (ordersFound.length === 0) newData = noMatch;
  //   // show list of orders as user types
  //   else newData = query.length === 0 ? orders : ordersFound;

  //   setStartPosition(tableDetails.startingPosition);
  //   setEndPosition(tableDetails.endPosition);
  //   setData(newData);
  // };

  const findOrders = (eventType: OrderEventType) =>
    addComma(data.filter(({ event_name }) => event_name === eventType).length);

  const stats = (
    <>
      <Stats label={addComma(data.length)} description="Orders" />
      <Stats label={findOrders("CREATED")} description="Created" />
      <Stats label={findOrders("COOKED")} description="Cooked" />
      <Stats
        label={findOrders("DRIVER_RECEIVED")}
        description="Driver Received"
      />
      <Stats label={findOrders("DELIVERED")} description="Delivered" />
      <Stats label={findOrders("CANCELLED")} description="Cancelled" />
    </>
  );

  return (
    <AppLayout navContent={stats}>
      {/* <SearchSection onChange={updateTableFields} /> */}
      <Order forwardedRef={ordersContainer} orders={viewportData} />
    </AppLayout>
  );
};

export default App;
