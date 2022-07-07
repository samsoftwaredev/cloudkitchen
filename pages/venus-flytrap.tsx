import {Card, Hero, MainLayout, SectionContent, SectionTitle, Stats} from '@/components'
import { venusFlytrap01, venusFlytrap02, venusFlytrap03, venusFlytrap04, venusFlytrap05, venusFlytrap06, venusFlytrap07, venusFlytrap08, venusFlytrap09, venusFlytrap10, venusFlytrap11 } from '@/public/backgrounds'
import type { NextPage } from 'next'
import { COLORS } from '../constants'

const Home: NextPage = () => {
  const facts1 = [
    {
      value: "climate",
      label: "Climate",
      description: "Moist & Acidic Soil",
    },
    {
      value: "type",
      label: "Type",
      description: "Carnivorous",
    },
    {
      value: "sunlight",
      label: "Sun Light",
      description: "Direct",
    },
  ]

  const facts2 = [
    {
      value: "life",
      label: "Life Span",
      description: "+15 years",
    },
    {
      value: "protected",
      label: "Vulnerable",
      description: "Endangered Specie",
    },
    {
      value: "plant",
      label: "Plant",
      description: "Perennial",
    },
    {
      value: "temp",
      label: "Temperature",
      description: "60F - 80F",
    },
  ]

  return (
    <MainLayout>
      <Hero title="Venus Flytrap" subTitle='Plant insect eater' bgImage={venusFlytrap06} textColor={COLORS.white} isBottomShadowEnabled executeAnimationOnPageLoad component={<Stats stats={facts1}/>}  />
      <SectionTitle title='The “trap” is made of two hinged lobes at the end of each leaf.' />
      <Hero title="Diet" subTitle='The Venus flytrap gets some of its nutrients from the soil...' bgImage={venusFlytrap05} textColor={COLORS.white} isTopShadowEnabled isBottomShadowEnabled/>
      <SectionTitle title='...but to supplement its diet, the plant eats insects and arachnids. ' />
      <SectionContent>
        <Card isRow title="Usefulness" image={venusFlytrap02} text='Flytraps can eat ants, beetles, grasshoppers, flying insects, and spiders are all victims of the flytrap.' />
        <Card isReverse title="Time to Digest" isRow image={venusFlytrap04} text='It can take a Venus flytrap three to five days to digest an organism, and it may go months between meals.' />
        <Card isRow title="Commerce" image={venusFlytrap07} text='This plant is a popular potted plant in many parts of the world, but unfortunately most of the Venus flytraps sold have been cultivated or collected from declining wild populations.' />
      </SectionContent>
      <Hero title="No food, no problem" subTitle='It can survive months without a meal' bgImage={venusFlytrap01} textColor={COLORS.white} isBottomShadowEnabled isOverlay component={<Stats stats={facts2}/>}/>
      <SectionTitle title='The Venus flytrap is endemic to North and South Carolina.' />
      <Hero title="Did you know?" subTitle='Traps can only open and close several times before it dies.' bgImage={venusFlytrap03} textColor={COLORS.white} isTopShadowEnabled isOverlay />
      <SectionTitle title='Care and Tips' />
      <SectionContent>
        <Card isRow title="Recipient" image={venusFlytrap09} text='To grow big traps use a recipient 7" Tall, and 5" x 5"' />
        <Card isReverse title="Sun Light" isRow image={venusFlytrap11} text='South with about 5 hours of direct sunlight' />
        <Card isRow title="Media" image={venusFlytrap10} text='Use Peat Moss, Perlite and Silica Sand mix together' />
      </SectionContent>
    </MainLayout>
  )
}

export default Home
