export const getTimeDifference = (time: number) => {
  let t = new Date();
  const date = new Date(t.setSeconds(t.getSeconds() + time));
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  let strTime = `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
  return strTime;
};
