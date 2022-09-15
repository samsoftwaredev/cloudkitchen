function debounce(func: Function, timeout: number = 300) {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export default debounce;
