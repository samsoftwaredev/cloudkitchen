import { useState } from "react";
import type { NextPage } from "next";
import {
  AppLayout,
  Order,
  SearchOrder,
  SearchSection,
  Stats,
} from "@/components";
import { OrderEventType, OrderType } from "@/interfaces";
import { useSocket } from "@/hooks";
import { addComma, centsToUSD } from "utils";
import { NO_MATCH } from "@/constants/variables";

let renders = 0;
const App: NextPage = () => {
  console.log("************** render app **************", ++renders);
  const data: OrderType[] = useSocket(3000);
  const [searchData, setSearchData] = useState([]);

  const updateTableFields = (query: string): void => {
    let newData = [];
    const queryLC = query.toLowerCase();
    const noMatch = [
      {
        customer: NO_MATCH,
        destination: NO_MATCH,
        event_name: NO_MATCH,
        id: NO_MATCH,
        item: NO_MATCH,
        price: 0,
        sent_at_second: 0,
      },
    ];

    if (query.length === 0) {
      // if user erased text, show complete order list
      setSearchData([]);
    } else {
      // TODO: this search can be enhanced by storying the orders price using a binary tree
      const ordersFound = data.filter((order) => {
        // TODO: implement the following features
        // if (order.id.toLowerCase().includes(queryLC)) return order;
        // if (order.customer.toLowerCase().includes(queryLC)) return order;
        // if (order.destination.toLowerCase().includes(queryLC)) return order;
        // if (order.event_name.toLowerCase().includes(queryLC)) return order;
        // if (order.item.toLowerCase().includes(queryLC)) return order;
        // if (order.sent_at_second.toString().includes(queryLC)) return order;
        if (
          order.price.toString().includes(queryLC) ||
          centsToUSD(order.price).toString().includes(queryLC)
        )
          return order;
      });
      if (ordersFound.length === 0) {
        // show "NoMatch" content if no order were found
        newData = noMatch;
      } else {
        // show list of orders as user types
        newData = query.length === 0 ? data : ordersFound;
      }
      setSearchData(newData);
    }
  };

  const findOrders = (eventType: OrderEventType) => {
    const dataToFilter = searchData.length > 0 ? searchData : data;
    return addComma(
      dataToFilter.filter(({ event_name }) => event_name === eventType).length
    );
  };

  const countTotal = () => {
    const dataToFilter = searchData.length > 0 ? searchData : data;
    if (dataToFilter[0]?.id === NO_MATCH) return 0;
    return addComma(dataToFilter.length);
  };

  const stats = (
    <>
      <SearchSection onChange={updateTableFields} />
      <Stats label={countTotal()} description="Orders" />
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
      {searchData.length > 0 ? (
        <SearchOrder orders={searchData} />
      ) : (
        <Order orders={data} />
      )}
    </AppLayout>
  );
};

export default App;
