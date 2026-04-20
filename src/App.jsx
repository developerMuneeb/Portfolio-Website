import BackgroundLayers from "./components/BackgroundLayers";
import TopNav from "./components/TopNav";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import WorkSection from "./components/WorkSection";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";
import { usePortfolioEffects } from "./hooks/usePortfolioEffects";

export default function App() {
  usePortfolioEffects();

  return (
    <>
      <BackgroundLayers />
      <TopNav />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <WorkSection />
      <ContactSection />
      <SiteFooter />
    </>
  );
}
