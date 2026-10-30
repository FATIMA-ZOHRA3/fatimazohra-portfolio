import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection, SkillMarquee } from "@/components/skills-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { CursorGlow, PageLoader, ScrollProgress } from "@/components/motion-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Fatima Zohra Bentouhami — Élève-ingénieure Full Stack & IA",
      },
      {
        name: "description",
        content:
          "Portfolio de Fatima Zohra Bentouhami : applications web et mobile avec IA intégrée, projets full stack, compétences et recherche d’un stage de fin d’études (PFE).",
      },
      { property: "og:title", content: "Fatima Zohra Bentouhami — Portfolio Full Stack & IA" },
      {
        property: "og:description",
        content:
          "Projets web & mobile avec IA intégrée, compétences full stack et recherche d’un stage PFE.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Fatima Zohra Bentouhami — Portfolio Full Stack & IA" },
      {
        name: "twitter:description",
        content:
          "Projets web & mobile avec IA intégrée, compétences full stack et recherche d’un stage PFE.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh">
      <PageLoader initials="FZ" />
      <ScrollProgress />
      <CursorGlow />
      <SiteHeader />
      <main>
        <Hero />
        <SkillMarquee />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
