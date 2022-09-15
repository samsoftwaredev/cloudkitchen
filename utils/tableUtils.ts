export const clickable = ({ onClick }: { onClick: Function }, data: any) => {
  if (typeof onClick === "function") onClick(data);
};

export const generateUID = () => {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  const firstPart = (Math.random() * 46656) | 0;
  const secondPart = (Math.random() * 46656) | 0;
  const firstId = ("000" + firstPart.toString(36)).slice(-3);
  const secondId = ("000" + secondPart.toString(36)).slice(-3);
  return `${firstId}${secondId}`;
};
