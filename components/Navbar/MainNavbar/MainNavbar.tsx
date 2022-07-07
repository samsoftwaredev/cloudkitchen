import Link from 'next/link'
import { PRODUCT_NAVLINKS, PAGES, STORE_NAVLINKS } from "@/constants"
import styles from './mainNavbar.module.scss'
import { Logo } from '@/components'

interface Props {
    type?: "main" | "store";
}

const MainNavbar = ({ type = "main" }: Props) => {
    const displayContent = {
        "main": {
            section: "",
            navLinks: PRODUCT_NAVLINKS,
        },
        "store": {
            section: "Store",
            navLinks: STORE_NAVLINKS,
        },
    }
    const data = displayContent[type];
    return (
        <nav className={styles.container}>
            <div className={styles.logo}>
                <Link href={PAGES.home.link}>
                    <a className={styles.link}><Logo/><span>{data.section}</span></a>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <ul className={styles.item}>
                    {data.navLinks.map(({value, label, link})=> 
                        <li key={value} className={styles.itemLink}>
                            <Link href={link}><a>{label}</a></Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default MainNavbar