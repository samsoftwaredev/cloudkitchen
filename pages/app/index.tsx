import type { NextPage } from "next";
import { AppLayout, Order } from "@/components";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { OrderType } from "@/interfaces/*";

const App: NextPage = () => {
  const [data, setData]: [OrderType | [], Function] = useState([]);

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

  useEffect(() => {
    // TODO: URL env file
    const newSocket = io("http://localhost:4000");
    let memory = [];
    let execute = false;
    let timer;

    const startTimer = () => {
      timer = setTimeout((_) => {
        timer = null;
        execute = true;
      }, 2000);
    };

    const setNewData = (newData: OrderType[]) => {
      let groupById: { [key: string]: OrderType } = {};
      setData((prevData: OrderType[]) => {
        newData.forEach((d) => {
          groupById[d.id] = d;
        });
        const updatedData = Object.values(groupById);
        return prevData
          .concat(updatedData)
          .map((d, index) => ({ index: index + 1, ...d }));
      });
    };

    const debounce = (newData: OrderType[]) => {
      let newD = memory.concat(newData);
      if (execute === true) {
        setNewData(newD);
        clearTimeout(timer);
        startTimer();
        execute = false;
        memory = [];
      }
    };

    startTimer();
    newSocket.on("order_event", debounce);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <AppLayout>
      {/* <SearchSection onChange={updateTableFields} /> */}
      <Order orders={data} />
    </AppLayout>
  );
};

export default App;
