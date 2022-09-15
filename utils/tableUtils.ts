export const clickable = ({ onClick }: { onClick: Function }, data: any) => {
  if (onClick) onClick(data);
};
