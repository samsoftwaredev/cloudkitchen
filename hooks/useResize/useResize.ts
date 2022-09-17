import { useState, useEffect } from "react";
import debounce from "utils/debounce";

const useResize = () => {
  const [resizePosition, setResizePosition]: [number | undefined, Function] =
    useState();

  useEffect(() => {
    const resizeListener = () => {
      setResizePosition(window.innerWidth);
    };

    return () => {
      window.addEventListener("resize", debounce(resizeListener, 1500));
    };
  }, []);

  return resizePosition;
};

export default useResize;
