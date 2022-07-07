import type { NextPage } from 'next'
import { MainLayout, Hero, CTA } from '@/components'
import { useRouter } from 'next/router';
import {orchid01, orchid02, orchid03, venusFlytrap01, venusFlytrap02, venusFlytrap08 } from '@/public/backgrounds'
import { COLORS, PAGES } from '@/constants'
import { Button } from '@chakra-ui/react'

const Home: NextPage = () => {
  const router = useRouter();
  const primaryButton = {width:300, borderRadius: 50, size:'lg'};
  const secondaryButton = {width:300, variant:'outline', colorScheme: 'whiteAlpha' , color:COLORS.white, borderRadius: 50, size:'lg'};

  const onSignUpClick = () =>  router.push(PAGES.signUp.link)
  const onStoreClick = () =>  router.push(PAGES.store.link)
  const onOrchidClick = () =>  router.push(PAGES.orchids.link)
  const onVenusFlytrapClick = () =>  router.push(PAGES.venusFlytrap.link)

  const CTAWelcome = (
    <CTA>
      <Button onClick={onStoreClick} {...primaryButton}>Online Store</Button>
      <Button onClick={onSignUpClick} {...secondaryButton}>Sign Up</Button>
    </CTA>
  )

  const CTAOnlineStore = (
    <CTA>
      <Button onClick={onStoreClick} {...primaryButton}>Shop Now</Button>
    </CTA>
  )

  const CTANotifications = (
    <CTA>
      <Button onClick={onSignUpClick} {...primaryButton}>Get Started</Button>
    </CTA>
  )

  const CTASignUpAccounting = (
    <CTA>
      <Button onClick={onSignUpClick} {...primaryButton}>Start Tracking</Button>
    </CTA>
  )

  const CTACommunity = (
    <CTA>
      <Button onClick={onSignUpClick} {...primaryButton}>Join Today</Button>
    </CTA>
  )

  const CTAKnowledge = (
    <CTA>
      <Button onClick={onOrchidClick} {...secondaryButton}>Orchids</Button>
      <Button onClick={onVenusFlytrapClick} {...secondaryButton}>Venus Flytrap</Button>
    </CTA>
  )

  return (
    <MainLayout>
      <Hero title="Luisa's Garden" subTitle='Helping gardeners succeed using software' bgImage={orchid01} executeAnimationOnPageLoad textColor={COLORS.white} isOverlay component={CTAWelcome} />
      <Hero title='Online Store' subTitle='Buy everything you need for your garden' bgImage={venusFlytrap02} textColor={COLORS.white} isOverlay component={CTAOnlineStore} />
      <Hero title='Alerts' subTitle='Get notify when your plants are in need' bgImage={orchid02} component={CTANotifications} />
      <Hero title='Accounting' subTitle='Keep track of your finances' bgImage={venusFlytrap01} textColor={COLORS.white} component={CTASignUpAccounting}/>
      <Hero title='Community' subTitle='Talk with gardeners all over the world' bgImage={orchid03} component={CTACommunity}/>
      <Hero title='Knowledge' subTitle='Get to know your plants' bgImage={venusFlytrap08} textColor={COLORS.white} isBottomShadowEnabled component={CTAKnowledge}/>
    </MainLayout>
  )
}

export default Home
