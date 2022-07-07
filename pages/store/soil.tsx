import { Card, MainLayout, SectionContent, SectionTitle } from "@/components";
import { soil } from "@/public/backgrounds";
import type { NextPage } from "next";

const Soil: NextPage = () => {
  return (
    <MainLayout type="store">
    <SectionTitle title="Soil" />
      <SectionContent>
      <SectionTitle title="Best Sellers" />
        <Card
          image={soil}
          text="4 Qts. Organic Premium Mix | Use with Venus Fly Traps, Pitcher Plants, or Other Carnivorous Plants"
          title="Carnivorous Plant Soil"
        />
        <Card
          image={soil}
          text="4 Qts. Organic Premium Mix | Use with Venus Fly Traps, Pitcher Plants, or Other Carnivorous Plants"
          title="Orchid Soil Premium All Purpose Blend"
        />
      </SectionContent>
    </MainLayout>
  );
};

export default Soil;
