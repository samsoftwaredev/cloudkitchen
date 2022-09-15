import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import { Close } from "@mui/icons-material";
import styles from "./drawer.module.scss";
import { css } from "utils";

interface Props {
  children: ReactNode;
  isOpen?: Boolean;
  onClose?: Function;
}

const drawerSize = (isOpen: Boolean) => (isOpen ? "0px" : "-505px");

const Drawer = ({ children, isOpen = false, onClose }: Props) => {
  const drawerRef = useRef();
  const [open, setOpen] = useState(isOpen);

  const toggleHandler = () => {
    const toggleBoolean = !open;
    if (drawerRef.current) {
      drawerRef.current.style.right = drawerSize(toggleBoolean);
      if (typeof onClose === "function") onClose(toggleBoolean);
      setOpen(toggleBoolean);
    }
  };

  useEffect(() => {
    if (drawerRef.current) {
      drawerRef.current.style.right = drawerSize(isOpen);
      setOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <div ref={drawerRef} className={styles.container}>
      <button
        className={css(["transparentBtn", styles.closeBtn])}
        onClick={toggleHandler}
      >
        <Close />
      </button>
      {children}
    </div>
  );
};

export default Drawer;
