import Link from "next/link";
import styles from "./sideNavbar.module.scss";
import { NavbarProps } from "@/interfaces";

const SideNavbar = ({ navLinks }: NavbarProps) => {
  return (
    <nav className={styles.container}>
      <div className={styles.linkContainer}>
        <ul className={styles.items}>
          {navLinks?.map(({ value, label, link }) => (
            <li key={value} className={styles.itemLink}>
              <Link href={link}>
                <a>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideNavbar;
