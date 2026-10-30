import { BadgeCheck, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion-kit";

import { experience, ui } from "@/data/portfolio";
import { useLanguage } from "@/lib/language";

export function ExperienceSection() {
  const { lang, pick } = useLanguage();

  return (
    <section id="experience" className="scroll-mt-28 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="01" title={pick(ui.sections.experienceTitle)} />

        <Reveal>
        <div className="card-lift overflow-hidden rounded-3xl border border-border bg-card">
          <div className="h-2 bg-sun-strip bg-[length:200%_100%] animate-shimmer-bar" />
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                {pick(experience.period)}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold">{pick(experience.title)}</h3>
              <p className="mt-1 font-semibold text-primary">{pick(experience.company)}</p>
              <p className="mt-3 text-muted-foreground">{pick(experience.summary)}</p>
              <a
                href={experience.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
              >
                {pick(ui.sections.viewCode)} <ExternalLink className="size-3.5" />
              </a>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                {pick(ui.sections.highlights)}
              </p>
              <Stagger as="ul" className="space-y-3" stagger={0.12}>
                {experience.points[lang].map((point) => (
                  <StaggerItem as="li" key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{point}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <motion.div
      className="mb-8 flex items-center gap-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      <motion.span
        variants={{
          hidden: { scale: 0, rotate: -90, opacity: 0 },
          show: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 16 } },
        }}
        whileHover={{ rotate: 8, scale: 1.08 }}
        className="grid size-12 place-items-center rounded-2xl bg-sun-strip font-display text-sm font-extrabold text-primary-foreground shadow-sun"
      >
        {index}
      </motion.span>
      <motion.h2
        variants={{
          hidden: { opacity: 0, x: -24 },
          show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.span
        aria-hidden
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
        }}
        style={{ originX: 0 }}
        className="h-1 flex-1 rounded-full bg-gradient-to-r from-accent to-transparent"
      />
    </motion.div>
  );
}
