import styles from "./stats.module.scss";

interface Props {
  label: string | number;
  description: string | number;
}

const Stats = ({ label, description }: Props) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.label}>{label}</h4>
      <h6 className={styles.description}>{description}</h6>
    </div>
  );
};

export default Stats;
