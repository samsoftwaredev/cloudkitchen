import Image from 'next/image'
import styles from './logo.module.scss'
import logo from "@/public/orchid.svg"

const Logo = () => {
    return (
        <div className={styles.container}>
            <Image
                className={styles.image}
                alt="Orchid Company Logo"
                src={logo}
                quality={100}
            />
        </div>
    )
}

export default Logo