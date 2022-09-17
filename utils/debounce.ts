export default function debounce(func: Function, time = 100) {
  var time = time;
  var timer: number;
  return function (event: any) {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(func, time, event);
  };
}
