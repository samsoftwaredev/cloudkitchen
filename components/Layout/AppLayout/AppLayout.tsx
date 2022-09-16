import { Navbar } from "@/components";
import { NAV_TYPE } from "@/constants/variables";
import { ReactNode } from "react";
import styles from "./appLayout.module.scss";

interface Props {
  children: ReactNode;
  navContent: ReactNode;
}

const AppLayout = ({ children, navContent }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Navbar type={NAV_TYPE.APP} />
        {navContent}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AppLayout;
