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
      <ul>
        {sections.map(({ label, value }) => (
          <li key={value}>{label}</li>
        ))}
      </ul>
    </div>
  );
};

export default SectionMap;
