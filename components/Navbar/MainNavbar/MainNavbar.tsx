import Link from "next/link";
import { PAGES } from "@/constants";
import styles from "./mainNavbar.module.scss";
import { Logo } from "@/components";
import { NavbarProps } from "@/interfaces/*";

const MainNavbar = ({ navLinks }: NavbarProps) => {
  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <Link href={PAGES.home.link}>
          <a className={styles.link}>
            <Logo />
          </a>
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <ul className={styles.item}>
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

export default MainNavbar;
