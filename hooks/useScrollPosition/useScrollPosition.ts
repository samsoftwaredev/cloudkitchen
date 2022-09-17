import { useCallback, useEffect, useState } from "react";
import { ScrollPosition } from "@/interfaces";
import debounce from "utils/debounce";

let lastScrollPosition = 0;
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition]: [ScrollPosition, Function] =
    useState({ state: "top", direction: "down" });

  const onScroll = useCallback(() => {
    let modifier = 1;
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    let currScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    let state;
    let direction;
    // location in the page
    if (window.pageYOffset === 0) {
      state = "top";
    } else if (currentScroll + modifier > documentHeight) {
      state = "bottom";
    } else {
      state = "middle";
    }
    // direction of the scroll
    if (currScrollPosition > lastScrollPosition) {
      direction = "down";
    } else {
      direction = "up";
    }

    lastScrollPosition = currScrollPosition <= 0 ? 0 : currScrollPosition;
    setScrollPosition({ state, direction });
  }, []);

  useEffect(() => {
    //add eventlistener to window
    // using debounce so it doesn't execute every time
    window.addEventListener("scroll", debounce(onScroll, 1500));
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
