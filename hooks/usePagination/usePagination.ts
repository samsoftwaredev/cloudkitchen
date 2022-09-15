import { useMemo } from "react";
import { arraysAreTheSame } from "utils";
import { OrderType, scrollDirection, ScrollPosition } from "@/interfaces";

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
  ordersContainer,
}: {
  data: OrderType[];
  scrollPosition: ScrollPosition;
  ordersContainer: any;
}): OrderType[] => {
  const calcHeight = (state: string, modifier = 0): number => {
    const documentHeight = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const numOfOrdersOnTop = window.pageYOffset / pagination.cellHeight;
    const numOfOrdersOnBottom =
      (documentHeight - currentScroll) / pagination.cellHeight;

    if (state === "top") {
      return Math.floor(numOfOrdersOnTop - modifier);
    } else {
      return Math.floor(numOfOrdersOnBottom - modifier);
    }
  };

  const setHeight = (orders: OrderType[], direction: scrollDirection) => {
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
        pagination.endingPosition - pagination.startingPosition >=
        pagination.maxGap
          ? pagination.endingPosition
          : pagination.endingPosition + 1;
    }

    ordersContainer.current.style.paddingTop =
      numOfOrdersOnTop * pagination.cellHeight + "px";
    ordersContainer.current.style.paddingBottom =
      numOfOrdersOnBottom * pagination.cellHeight + "px";

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

  const setBottomHeight = (orders: OrderType[], modifier = 0) => {
    const height =
      calcHeight("top") >= pagination.minGap
        ? calcHeight("top")
        : pagination.startingPosition;

    pagination.endingPosition =
      pagination.endingPosition + pagination.incrementBy;

    pagination.startingPosition = height;

    ordersContainer.current.style.paddingTop =
      height * pagination.cellHeight + modifier + "px";

    return orders.slice(pagination.startingPosition, pagination.endingPosition);
  };

  const viewPortData = useMemo(() => {
    let newOrderList = data.slice(
      pagination.startingPosition,
      pagination.endingPosition
    );

    if (ordersContainer.current) {
      switch (scrollPosition.state) {
        case "top":
          newOrderList = data.slice(0, pagination.minGap);
          ordersContainer.current.style.paddingTop = "0";
          break;
        case "middle":
          newOrderList = setHeight(data, scrollPosition.direction);
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
  }, [data, scrollPosition]);

  return viewPortData;
};

export default usePagination;
