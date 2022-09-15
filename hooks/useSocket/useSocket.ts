import io from "socket.io-client";
import { useEffect, useState } from "react";
import { OrderType } from "@/interfaces";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const useSocket = (debounceWaitSec = 5000, url = BACKEND_URL) => {
  const [data, setData]: [OrderType | [], Function] = useState([]);

  useEffect(() => {
    const newSocket = io(url);
    let memory: OrderType[] | [] = [];
    let execute = false;
    let timer: number;

    const startTimer = () => {
      timer = window.setTimeout(() => {
        timer = -1;
        execute = true;
      }, debounceWaitSec);
    };

    const setNewData = (newData: OrderType[]) => {
      let groupById: { [key: string]: OrderType } = {};
      setData((prevData: OrderType[]) => {
        prevData.forEach((d) => {
          groupById[d.id] = d;
        });
        newData.forEach((d) => {
          const oldHistory = groupById[d.id]?.orderHistory || [];
          if (groupById[d.id] !== undefined) {
            groupById[d.id] = { ...d, orderHistory: oldHistory.concat(d) };
          } else {
            groupById[d.id] = { ...d, orderHistory: oldHistory };
          }
        });
        return Object.values(groupById).map((d, index) => ({
          index: index + 1,
          ...d,
        }));
      });
    };

    const debounce = (newData: OrderType[]) => {
      let list = (memory as OrderType[]).concat(newData);
      if (execute === true) {
        setNewData(list);
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

  return data;
};

export default useSocket;
