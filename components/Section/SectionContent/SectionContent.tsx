import { ReactNode } from "react";
import styles from "./sectionContent.module.scss";

interface Props {
  children: ReactNode;
  className: String;
}

const SectionContent = ({ className, children }: Props) => {
  return <div className={className}>{children}</div>;
};

export default SectionContent;
