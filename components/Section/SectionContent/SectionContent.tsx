import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
}

const SectionContent = ({ className, children }: Props) => {
  return <div className={className}>{children}</div>;
};

export default SectionContent;
