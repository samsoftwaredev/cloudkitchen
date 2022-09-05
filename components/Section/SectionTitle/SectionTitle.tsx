import styles from "./sectionTitle.module.scss";

interface Props {
  title: string;
}

const SectionTitle = ({ title }: Props) => {
  return (
    <div className={styles.container}>
      <h5>{title}</h5>
    </div>
  );
};

export default SectionTitle;
