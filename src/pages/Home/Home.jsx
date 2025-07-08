import React from "react";
import PlansSection from "./PlansSection";
import TrendingSlider from "./TrendingSlider";
import PublishersSection from "./PublisherSection";
import StatsSection from "./StatSection";
import ThoughtOfTheDay from "./ThroughOfTheDay";
import TrendingInMedia from "./TrendingInMedia";
import TrendingAuthors from "./TredingAuthors";
import HomeBanner from "./HomeBanner";
import SubscriptionModal from "./SubscriptionModal";

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>

      <div className="container mx-auto px-4 space-y-5">
        <TrendingSlider></TrendingSlider>
        <PublishersSection></PublishersSection>
        <PlansSection></PlansSection>
        <TrendingAuthors></TrendingAuthors>
        <TrendingInMedia></TrendingInMedia>

        <ThoughtOfTheDay></ThoughtOfTheDay>
        <StatsSection></StatsSection>
        <SubscriptionModal></SubscriptionModal>
      </div>
    </div>
  );
};

export default Home;
