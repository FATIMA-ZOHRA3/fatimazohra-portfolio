import { GraduationCap, Languages } from "lucide-react";

import { education, spokenLanguages, ui } from "@/data/portfolio";
import { useLanguage } from "@/lib/language";
import { SectionHeading } from "@/components/experience-section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-kit";

export function EducationSection() {
  const { lang, pick } = useLanguage();

  return (
    <section id="formation" className="scroll-mt-28 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="04" title={pick(ui.sections.educationTitle)} />

        <Stagger as="ol" className="relative space-y-6 border-l-2 border-accent pl-6 sm:pl-8" stagger={0.15}>
          {education.map((item) => (
            <StaggerItem as="li" key={item.period} className="relative">
              <span
                aria-hidden
                className="absolute top-1 -left-[31px] grid size-5 place-items-center rounded-full bg-sun-strip ring-4 ring-background sm:-left-[39px]"
              >
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-30" />
              </span>
              <div className="card-lift rounded-3xl border border-border bg-card p-5 sm:p-6">
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                  {item.period}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">{pick(item.title)}</h3>
                {item.school[lang] && (
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="size-4 text-primary" aria-hidden />
                    {pick(item.school)}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
            <Languages aria-hidden className="size-4 text-primary" />
            <span className="font-bold text-foreground">{pick(ui.sections.languagesLabel)} :</span>
            {pick(spokenLanguages)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
