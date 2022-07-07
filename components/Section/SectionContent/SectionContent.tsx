import { ReactNode } from 'react'
import styles from './sectionContent.module.scss'

interface Props {
    children: ReactNode
}

const SectionContent = ({children}: Props) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default SectionContent