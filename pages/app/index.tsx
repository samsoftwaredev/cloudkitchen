import type { NextPage } from "next";
import { AppLayout, Order } from "@/components";
import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import { OrderType } from "@/interfaces";
import { useRef } from "react";
import { useMemo } from "react";
import debounce from "utils/debounce";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
let prevOrderList: OrderType[];

const arraysAreTheSame = (arr1?: Array<OrderType>, arr2?: Array<OrderType>) =>
  JSON.stringify(arr1) === JSON.stringify(arr2);

const pagination = {
  incrementBy: 1,
  startingPosition: 0,
  endingPosition: 100,
  lastScroll: 0, // TOP
  minGap: 100,
  maxGap: 200,
};

const debounceWaitSec = 5000;
const cellHeight = 80;
let renders = 0;
const App: NextPage = () => {
  console.log("************** render app **************", ++renders);
  const [data, setData]: [OrderType | [], Function] = useState([]);
  const [userPosition, setUserPosition]: [
    { state: string; direction: string },
    Function
  ] = useState({ state: "top", direction: "down" });
  const ordersContainer = useRef();

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
    const newSocket = io(BACKEND_URL);
    let memory = [];
    let execute = false;
    let timer;

    const startTimer = () => {
      timer = setTimeout((_) => {
        timer = null;
        execute = true;
      }, debounceWaitSec);
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

  const onScroll = useCallback(() => {
    // debounce function so it doesn't execute so much
    let modifier = 1;
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    let state;
    let direction;

    if (window.pageYOffset === 0) {
      console.log("You are at the top!");
      state = "top";
    } else if (currentScroll + modifier > documentHeight) {
      // When the user is [modifier]px from the bottom, fire the event.
      console.log("You are at the bottom!");
      state = "bottom";
    } else {
      console.log("You are at the middle!");
      state = "middle";
    }
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > pagination.lastScroll) {
      direction = "down";
    } else {
      direction = "up";
    }
    pagination.lastScroll = st <= 0 ? 0 : st;
    setUserPosition({ state, direction });
  }, []);

  useEffect(() => {
    //add eventlistener to window
    const func = debounce(() => onScroll(), 10);
    window.addEventListener("scroll", func);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", func);
    };
  }, []);

  const calcHeight = (state: string, modifier: number = 0): number => {
    // TODO: make table header fix
    // the amount of cells that off the screen on the top view
    const documentHeight = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const numOfOrdersOnTop = window.pageYOffset / cellHeight;
    const numOfOrdersOnBottom = (documentHeight - currentScroll) / cellHeight;

    if (state === "top") {
      console.log("num Of Order On top: ", numOfOrdersOnTop);
      return Math.floor(numOfOrdersOnTop - modifier);
    } else if (state === "bottom") {
      console.log("num Of Order On bottom: ", numOfOrdersOnBottom);
      return Math.floor(numOfOrdersOnBottom - modifier);
    } else {
      console.error("no match");
      return 0;
    }
  };

  const setHeight = (orders, direction) => {
    let numOfOrdersOnTop;
    let numOfOrdersOnBottom;

    const top = calcHeight("top");
    const bottom = calcHeight("bottom");

    if (direction === "up") {
      // padding
      numOfOrdersOnTop = top - 1 <= 0 ? 0 : top - 1;
      numOfOrdersOnBottom = bottom + 1;
      // array
      pagination.startingPosition = numOfOrdersOnTop;
      pagination.endingPosition =
        pagination.endingPosition - pagination.startingPosition >
        pagination.minGap
          ? pagination.endingPosition - 1
          : pagination.endingPosition;
    } else {
      // padding
      numOfOrdersOnTop = top + 1;
      numOfOrdersOnBottom = bottom - 1;
      // array
      pagination.startingPosition = top + 1;
      pagination.endingPosition =
        pagination.endingPosition - pagination.startingPosition >
        pagination.maxGap
          ? pagination.endingPosition
          : pagination.endingPosition + 1;
    }

    ordersContainer.current.style.paddingTop =
      numOfOrdersOnTop * cellHeight + "px";
    ordersContainer.current.style.paddingBottom =
      numOfOrdersOnBottom * cellHeight + "px";

    console.log(
      ">>>>",
      "\n numOfOrdersOnTop: ",
      numOfOrdersOnTop,
      "\n numOfOrdersOnBottom: ",
      numOfOrdersOnBottom,
      "\n startingPosition: ",
      pagination.startingPosition,
      "\n endingPosition: ",
      pagination.endingPosition,
      "\n gap: ",
      pagination.endingPosition - pagination.startingPosition
    );

    return orders.slice(pagination.startingPosition, pagination.endingPosition);
  };

  const setBottomHeight = (orders, modifier = 0) => {
    const height =
      calcHeight("top") >= pagination.minGap
        ? calcHeight("top")
        : pagination.startingPosition;

    pagination.endingPosition =
      pagination.endingPosition + pagination.incrementBy;

    pagination.startingPosition = height;

    ordersContainer.current.style.paddingTop =
      height * cellHeight + modifier + "px";

    return orders.slice(pagination.startingPosition, pagination.endingPosition);
  };

  const viewPortData = useMemo(() => {
    let newOrderList = data.slice(
      pagination.startingPosition,
      pagination.endingPosition
    );

    if (ordersContainer.current) {
      switch (userPosition.state) {
        case "top":
          newOrderList = data.slice(0, pagination.minGap);
          ordersContainer.current.style.paddingTop = "0";
          break;
        case "middle":
          newOrderList = setHeight(data, userPosition.direction);
          break;
        case "bottom":
          newOrderList = setBottomHeight(data);
          break;
        default:
          console.error("no matching case");
      }
    }

    if (arraysAreTheSame(prevOrderList, newOrderList)) {
      return prevOrderList;
    }
    prevOrderList = newOrderList;
    return newOrderList;
  }, [data, userPosition]);

  return (
    <AppLayout>
      {/* <SearchSection onChange={updateTableFields} /> */}
      <Order forwardedRef={ordersContainer} orders={viewPortData} />
    </AppLayout>
  );
};

export default App;
