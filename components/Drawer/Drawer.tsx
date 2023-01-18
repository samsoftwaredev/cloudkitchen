import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import { Close } from "@mui/icons-material";
import styles from "./drawer.module.scss";
import { css } from "@/utils";
import { useResize } from "@/hooks";

interface Props {
  children: ReactNode;
  isOpen?: Boolean;
  onClose?: Function;
}

let openDrawer = "0px";
let closeDrawer = "-505px";

const Drawer = ({ children, isOpen = false, onClose }: Props) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(isOpen);
  const widowWidth = useResize();

  const drawerSize = (isOpen: Boolean) => (isOpen ? openDrawer : closeDrawer);

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
      if (widowWidth && widowWidth <= 600 && isOpen) {
        drawerRef.current.style.width = "100%";
      } else {
        drawerRef.current.style.width = "500px";
      }
      drawerRef.current.style.right = drawerSize(isOpen);
      setOpen(isOpen);
    }
  }, [isOpen, widowWidth]);

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
