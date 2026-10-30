import { ExternalLink, FlaskConical } from "lucide-react";

import { profile, projects, ui, type Project } from "@/data/portfolio";
import { useLanguage } from "@/lib/language";
import { TechChip } from "@/components/tech-icon";
import { SectionHeading } from "@/components/experience-section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-kit";

const CAT_STYLES: Record<Project["cat"], string> = {
  Web: "bg-secondary text-secondary-foreground",
  IA: "bg-sun-strip text-primary-foreground",
  Java: "bg-accent text-accent-foreground",
};

export function ProjectsSection() {
  const { lang, pick } = useLanguage();

  return (
    <section id="projets" className="scroll-mt-28 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="02" title={pick(ui.sections.projectsTitle)} />
        <Reveal>
        <p className="-mt-4 mb-8 text-sm text-muted-foreground">
          {pick(ui.sections.projectsMore)}{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary underline decoration-2 underline-offset-4 hover:text-ember"
          >
            GitHub
          </a>
        </p>
        </Reveal>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {projects.map((project) => (
            <StaggerItem key={project.title.fr} className="h-full">
            <article
              className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card"
            >
              {project.img ? (
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.alt ? project.alt[lang] : ""}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="relative grid h-44 place-items-center bg-gradient-to-br from-secondary via-accent/50 to-primary/15">
                  <span className="font-display text-6xl font-extrabold text-primary/25">{project.year}</span>
                  <span
                    className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${CAT_STYLES[project.cat]}`}
                  >
                    {project.cat}
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  {project.img && (
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${CAT_STYLES[project.cat]}`}>
                      {project.cat}
                    </span>
                  )}
                  {project.status && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 px-2.5 py-1 text-[11px] font-bold text-primary">
                      <FlaskConical className="size-3" />
                      {pick(project.status)}
                    </span>
                  )}
                  <span className="ml-auto text-xs font-semibold text-muted-foreground">{project.year}</span>
                </div>

                <h3 className="mt-3 font-display text-lg leading-snug font-bold">{pick(project.title)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{pick(project.text)}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <TechChip
                      key={tech}
                      name={tech}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground"
                    />
                  ))}
                </div>

                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-ember"
                  >
                    <ExternalLink className="size-3.5" />
                    {pick(ui.sections.viewCode)}
                  </a>
                )}
              </div>
            </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
