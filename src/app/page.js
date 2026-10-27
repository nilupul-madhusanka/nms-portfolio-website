import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import SkillsSection from "@/app/components/SkillsSection";
import BackToTopButton from "./components/BackToTopButton";

export default function Home() {
  return (
    <>
      <a href="#home" className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-lg bg-purple-700 px-4 py-3 text-white focus:translate-y-0">Skip to content</a>
      <Navbar />
      <main id="home" tabIndex={-1} className="flex min-h-screen flex-col bg-[#121212]">
        <div className="container mt-20 mx-auto px-4 py-4 sm:px-6 lg:px-12">
          <HeroSection />
          <AchievementsSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EmailSection />
          <BackToTopButton />
        </div>
      </main>
      <Footer />
    </>
  );
}
