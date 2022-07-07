import {Stats, Card, SectionContent, SectionTitle, MainLayout, Hero, SectionMap} from '@/components'
import { COLORS } from '@/constants'
import {orchid06, orchid02, orchid03, orchid04, orchid05} from '@/public/backgrounds'
// import orchidBloom  from '@/public/videos/orchid_bloom.mp4'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const sections = [
    {
      value: "overview",
      label: "Overview",
    },
    {
      value: "health",
      label: "Health",
    },
    {
      value: "diet",
      label: "Diet",
    },
    {
      value: "diseases",
      label: "Diseases",
    },
    {
      value: "habitat",
      label: "Habitat",
    },
  ]



  const facts = [
    {
      value: "climate",
      label: "Climate",
      description: "Wet Tropics",
    },
    {
      value: "species",
      label: "Species",
      description: "+25,000",
    },
    {
      value: "sunlight",
      label: "Sun Light",
      description: "Indirect",
    },
  ]

  return (
    <MainLayout>
      <SectionMap sections={sections} />
      <Hero title="Orchids" subTitle='Elegance and Beauty' bgImage={orchid06} textColor={COLORS.white} isBottomShadowEnabled executeAnimationOnPageLoad component={<Stats stats={facts}/>}  isOverlay/>
      <SectionTitle title='These nonwoody perennial plants are generally terrestrial' />
      <Hero title="Did you know?" subTitle='Orchids like growing on other plants rather than rooted in soil' bgImage={orchid02} isTopShadowEnabled />
      <SectionContent>
          <video width="750" height="500" controls >
            {/* <source src={orchidBloom} type="video/mp4"/> */}
          </video>
      </SectionContent>
      <SectionContent>
        <Card isRow title="Usefulness" image={orchid03} text='The only commercially important product derived from orchids is vanilla.' />
        <Card isReverse title="Commerce" isRow image={orchid04} text='Most vanilla is produced from one species, Vanilla planifolia.' />
        <Card isRow title="Biggest Exporters" image={orchid05} text='The principal vanilla-growing areas are Madagascar, Mexico, French Polynesia, Réunion, Dominica, Indonesia, the West Indies, Seychelles, and Puerto Rico.' />
      </SectionContent>
    </MainLayout>
  )
}

export default Home
