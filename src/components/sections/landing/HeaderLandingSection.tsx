"use client";

import LandingPreloader from "./components/LandingPreloader";
import LandingHero from "./components/LandingHero";
import LandingVideo from "./components/LandingVideo";

const HeaderLandingSection = () => {
  return (
    <div className="flex flex-col gap-10">
      <LandingPreloader />
      <LandingHero />
      <LandingVideo />
    </div>
  );
};

export default HeaderLandingSection;
