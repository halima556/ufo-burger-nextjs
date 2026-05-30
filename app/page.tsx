"use client";

import { useEffect } from "react";
import { useModal } from "@/app/hooks/useModal";
import { useRevealObserver } from "@/app/hooks/useRevealObserver";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Hero } from "@/app/components/sections/Hero";
import { LegendSection } from "@/app/components/sections/LegendSection";
import { ProjectSection } from "@/app/components/sections/ProjectSection";
import { MenuSection } from "@/app/components/sections/MenuSection";
import { InsideSection } from "@/app/components/sections/InsideSection";
import { CrewSection } from "@/app/components/sections/CrewSection";
import { BusinessSection } from "@/app/components/sections/BusinessSection";
import { InvestorModal } from "@/app/components/sections/InvestorModal";
import { ScrollProgress } from "@/app/components/ui/ScrollProgress";
import { BackToTop } from "@/app/components/ui/BackToTop";
import { Starfield } from "@/app/components/ui/Starfield";
import { FloatingInvestorCTA } from "@/app/components/ui/FloatingInvestorCTA";

export default function Home() {
  const investorModal = useModal();
  useRevealObserver();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <FloatingInvestorCTA onClick={investorModal.open} />
      <Starfield />
      <Header onInvestorClick={investorModal.open} />
      <Hero onInvestorClick={investorModal.open} />
      <main>
        <LegendSection />
        <ProjectSection />
        <MenuSection />
        <InsideSection />
        <CrewSection />
        <BusinessSection onInvestorClick={investorModal.open} />
      </main>
      <Footer />
      <InvestorModal isOpen={investorModal.isOpen} onClose={investorModal.close} />
    </>
  );
}
