import { Heading } from '@chakra-ui/react';
import Image, { StaticImageData } from 'next/image'
import styles from './card.module.scss'

interface Props {
    image: StaticImageData,
    text: string,
    title: string,
    isRow?: boolean,
    isReverse?: boolean
}

const Card = ({image, text, title, isRow = false, isReverse = false }: Props) => {
    let reverseStyle = null;
    const directionStyle = isRow ? styles.row : styles.column;
    
    if(isRow && isReverse) reverseStyle = styles.rowReverse;
    if(!isRow && isReverse) reverseStyle = styles.columnReverse;

    return (
        <div className={[styles.container,reverseStyle, directionStyle].join(' ')}>
            <div className={styles.imageContainer}>
                <Image className={styles.image} src={image} />
            </div>
            <div className={styles.content}>
                <Heading as='h6' size='sm' paddingBottom={3}>
                    {title}
                </Heading>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    )
}

export default Card