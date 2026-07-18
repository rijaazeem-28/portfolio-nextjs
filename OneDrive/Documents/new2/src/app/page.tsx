import { AboutSection } from "@/sections/AboutSection";
import { ContactSection } from "@/sections/ContactSection";
import { EducationSection } from "@/sections/EducationSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { HeroSection } from "@/sections/HeroSection";
import { PortfolioSection } from "@/sections/PortfolioSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { SkillsSection } from "@/sections/SkillsSection";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rija Azeem",
  jobTitle: "Full Stack MERN Developer",
  url: "https://rija-azeem.dev",
  sameAs: [
    "https://github.com/rija-azeem",
    "https://linkedin.com/in/rija-azeem",
    "https://instagram.com/rija.azeem",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  email: "mailto:hello@rija-azeem.dev",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <ServicesSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
