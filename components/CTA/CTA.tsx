import { ButtonGroup } from "@chakra-ui/react";
import { ReactNode } from "react";
import styles from "./cta.module.scss";

interface Props {
  children: ReactNode,
}

const CTA = ({ children }: Props) => {
  return (
    <div className={styles.container}>
        <ButtonGroup gap='4'>
            {children}
        </ButtonGroup>
    </div>
  );
};

export default CTA;
