import { Analytics } from "@vercel/analytics/react";
import BackgroundLayers from "./components/BackgroundLayers";
import WorldLoader from "./world/WorldLoader";
import ScrollProgress from "./components/motion/ScrollProgress";
import Cursor from "./components/motion/Cursor";
import Preloader from "./components/motion/Preloader";
import { IntroProvider } from "./components/motion/IntroProvider";
import TopNav from "./components/TopNav";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import CredentialsSection from "./components/CredentialsSection";
import SkillsSection from "./components/SkillsSection";
import ServicesSection from "./components/ServicesSection";
import WorkSection from "./components/WorkSection";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";
import { usePortfolioEffects } from "./hooks/usePortfolioEffects";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();
  usePortfolioEffects();

  return (
    <IntroProvider>
      <Preloader />
      <Cursor />
      <BackgroundLayers />
      <WorldLoader />
      <ScrollProgress />
      <TopNav />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ExperienceSection />
      <CredentialsSection />
      <SkillsSection />
      <ServicesSection />
      <WorkSection />
      <ContactSection />
      <SiteFooter />
      <Analytics />
    </IntroProvider>
  );
}
