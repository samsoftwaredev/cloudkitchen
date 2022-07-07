import { List, ListIcon, ListItem } from "@chakra-ui/react";
import styles from "./sectionMap.module.scss";

interface Props {
  sections: {
    value: string;
    label: string;
  }[];
}

const SectionMap = ({ sections }: Props) => {
  return (
    <div className={styles.container}>
      <List spacing={3}>
        {sections.map(({ label, value }) => (
          <ListItem key={value}>
            <ListIcon color="green.500" />
            {label}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SectionMap;
