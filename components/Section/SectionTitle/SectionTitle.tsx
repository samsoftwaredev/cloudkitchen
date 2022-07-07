import { COLORS } from '@/constants'
import { Heading } from '@chakra-ui/react'
import styles from './sectionTitle.module.scss'

interface Props {
    title: string
}

const SectionTitle = ({title}: Props) => {
    return (
        <div className={styles.container}>
            <Heading as='h5' size='xl' noOfLines={1} textColor={COLORS.white}>{title}</Heading>
        </div>
    )
}

export default SectionTitle