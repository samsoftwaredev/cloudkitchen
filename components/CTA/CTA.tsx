import { ReactNode } from "react";
import styles from "./cta.module.scss";

interface Props {
  children: ReactNode;
}

const CTA = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default CTA;
