import type { NextPage } from "next";
import { MainLayout, Hero, CTA, SectionTitle, Card } from "@/components";
import { useRouter } from "next/router";
import {
  orchid01,
  orchid06,
  orchid03,
  orchid02,
  orchid04,
  orchid05,
} from "@/public/backgrounds";
import { PAGES } from "@/constants";

const Home: NextPage = () => {
  const router = useRouter();
  const secondaryButton = {
    width: 300,
    variant: "outline",
    colorScheme: "whiteAlpha",
    borderRadius: 50,
    size: "lg",
  };

  const onSignUpClick = () => router.push(PAGES.signUp.link);

  const CTAWelcome = (
    <CTA>
      <button onClick={onSignUpClick} {...secondaryButton}>
        Sign Up
      </button>
    </CTA>
  );

  return (
    <MainLayout>
      <Hero
        title="Luisa's Garden"
        subTitle="Helping gardeners succeed using software"
        bgImage={orchid01}
        executeAnimationOnPageLoad
        isOverlay
        component={CTAWelcome}
      />
      <Hero
        title="Orchids"
        subTitle="Elegance and Beauty"
        bgImage={orchid06}
        isBottomShadowEnabled
        executeAnimationOnPageLoad
        isOverlay
      />
      <SectionTitle title="These nonwoody perennial plants are generally terrestrial" />
      <Hero
        title="Did you know?"
        subTitle="Orchids like growing on other plants rather than rooted in soil"
        bgImage={orchid02}
        isTopShadowEnabled
      />
      <Card
        isRow
        title="Usefulness"
        image={orchid03}
        text="The only commercially important product derived from orchids is vanilla."
      />
      <Card
        isReverse
        title="Commerce"
        isRow
        image={orchid04}
        text="Most vanilla is produced from one species, Vanilla planifolia."
      />
      <Card
        isRow
        title="Biggest Exporters"
        image={orchid05}
        text="The principal vanilla-growing areas are Madagascar, Mexico, French Polynesia, Réunion, Dominica, Indonesia, the West Indies, Seychelles, and Puerto Rico."
      />
    </MainLayout>
  );
};

export default Home;
