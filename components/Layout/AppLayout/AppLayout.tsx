import { Navbar } from "@/components";
import { NAV_TYPE } from "@/constants/variables";
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./appLayout.module.scss";
import { css } from "utils";
import useResize from "@/hooks/useResize";

interface Props {
  children: ReactNode;
  navContent: ReactNode;
}

const AppLayout = ({ children, navContent }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const widowWidth = useResize();
  const menuBtn = useRef(null);
  const menuNav = useRef(null);

  const toggleMenu = () => {
    const currentState = !menuOpen;
    setMenuOpen(currentState);
    if (currentState === true) {
      menuBtn.current.style.marginLeft = "250px";
      menuNav.current.style.width = "250px";
    } else {
      menuBtn.current.style.marginLeft = "10px";
      menuNav.current.style.width = "0px";
    }
  };

  useEffect(() => {
    if (widowWidth && widowWidth >= 600) {
      menuBtn.current.style.marginLeft = "250px";
      menuNav.current.style.width = "250px";
    }
  }, [widowWidth]);

  return (
    <>
      <button
        ref={menuBtn}
        className={css([styles.btnMenu, "btn"])}
        onClick={toggleMenu}
      >
        {menuOpen ? "<" : ">"}
      </button>
      <div className={styles.container}>
        <div ref={menuNav} className={styles.sidebar}>
          <Navbar type={NAV_TYPE.APP} />
          {navContent}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default AppLayout;
