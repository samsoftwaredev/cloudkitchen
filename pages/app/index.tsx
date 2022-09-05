import type { NextPage } from "next";
import { AppLayout, Order } from "@/components";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { OrderType } from "@/interfaces/*";

const App: NextPage = () => {
  const [data, setData]: [OrderType | [], Function] = useState([]);

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
      }, 5000);
    };

    const setNewData = (newData: OrderType[]) => {
      let groupById: { [key: string]: OrderType } = {};
      setData((prevData: OrderType[]) => {
        newData.forEach((d) => {
          groupById[d.id] = d;
        });
        const updatedData = Object.values(groupById);
        return prevData.concat(updatedData);
      });
    };

    const debounceData = (newData: OrderType[]) => {
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
    newSocket.on("order_event", debounceData);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <AppLayout>
      <Order orders={data} />
    </AppLayout>
  );
};

export default App;
