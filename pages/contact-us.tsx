import type { NextPage } from 'next'
import { MainLayout, SectionContent, SectionTitle } from '../components'

const contactUs: NextPage = () => {
    return (
        <MainLayout>
            <SectionContent>
                <SectionTitle title={"Contact"} />
            </SectionContent>
        </MainLayout>
    )
}

export default contactUs