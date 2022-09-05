import { Navbar } from "@/components";
import { NAV_TYPE } from "@/constants/variables";
import { ReactNode } from "react";
import styles from "./appLayout.module.scss";

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Navbar type={NAV_TYPE.APP} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AppLayout;
