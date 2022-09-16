import { useMemo } from "react";
import { arraysAreTheSame } from "utils";
import { OrderType, ScrollPosition } from "@/interfaces";

const pagination = {
  incrementBy: 1,
  startingPosition: 0,
  endingPosition: 100,
  minGap: 100,
  maxGap: 200,
  cellHeight: 80,
};

let prevOrderList: OrderType[];

const usePagination = ({
  data,
  scrollPosition,
  ordersElement,
}: {
  data: OrderType[];
  scrollPosition: ScrollPosition;
  ordersElement: any;
}): OrderType[] => {
  const calcNumOfOrders = (): number => {
    const numOfOrdersOnTop = window.pageYOffset / pagination.cellHeight;
    return Math.floor(numOfOrdersOnTop);
  };

  const setHeight = (orders: OrderType[]) => {
    const top = calcNumOfOrders();
    let numOfOrdersOnTop = top;

    pagination.startingPosition = top;
    pagination.endingPosition = pagination.startingPosition + pagination.minGap;

    // padding top
    ordersElement.current.style.paddingTop =
      numOfOrdersOnTop * pagination.cellHeight + "px";

    return orders.slice(pagination.startingPosition, pagination.endingPosition);
  };

  const viewPortData = useMemo(() => {
    let newOrderList: OrderType[] = [
      ...data.slice(0, pagination.endingPosition),
    ];

    if (ordersElement.current && data.length >= pagination.minGap) {
      switch (scrollPosition.state) {
        case "top":
          // if the user is at the beginning/top of the page
          newOrderList = data.slice(0, pagination.minGap);
          ordersElement.current.style.paddingTop = "0";
          break;
        default:
          newOrderList = setHeight(data);
      }
    }

    if (arraysAreTheSame(prevOrderList, newOrderList)) {
      return prevOrderList;
    }
    prevOrderList = newOrderList;
    return newOrderList;
  }, [data, scrollPosition]);

  return viewPortData;
};

export default usePagination;
