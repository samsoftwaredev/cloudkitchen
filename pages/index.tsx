import type { NextPage } from "next";
import { MainLayout, Hero, CTA } from "@/components";
import { useRouter } from "next/router";
import { cat } from "@/public/backgrounds";
import { PAGES } from "@/constants";

const Home: NextPage = () => {
  const router = useRouter();

  const onSignUpClick = () => router.push(PAGES.app.link);

  const CTAWelcome = (
    <CTA>
      <button className="btn cta" onClick={onSignUpClick}>
        View App
      </button>
    </CTA>
  );

  return (
    <MainLayout>
      <Hero
        title="CloudKitties"
        subTitle="Succeed in delivery with ghost kitties"
        bgImage={cat}
        executeAnimationOnPageLoad
        isOverlay
        component={CTAWelcome}
      />
    </MainLayout>
  );
};

export default Home;
