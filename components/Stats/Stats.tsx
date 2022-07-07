import { Heading } from '@chakra-ui/react'
import styles from './stats.module.scss'

interface Props {
    stats: {
        value: string,
        label: string,
        description: string,
    }[]
}

const Stats = ({ stats }: Props) => {
    return (
        <div className={styles.container}>
            {stats.map(({value, label, description})=>(
                <div className={styles.item} key={value}>
                    <Heading as='h5' size='lg' noOfLines={1}>
                        {label}
                    </Heading>
                    <Heading as='h6' size='sm' fontWeight={400}>
                        {description}
                    </Heading>
                </div>
            ))}
        </div>
    )
}

export default Stats