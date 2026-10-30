import { marqueeSkills, skills, ui } from "@/data/portfolio";
import { useLanguage } from "@/lib/language";
import { GROUP_ICONS, getTechIcon } from "@/components/tech-icon";
import { SectionHeading } from "@/components/experience-section";
import { Stagger, StaggerItem } from "@/components/motion-kit";
import { motion } from "motion/react";

export function SkillMarquee() {
  const row = [...marqueeSkills, ...marqueeSkills];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card py-4">
      <div className="animate-marquee flex w-max items-center gap-8">
        {row.map((skill, i) => {
          const Icon = getTechIcon(skill);
          return (
            <span key={`${skill}-${i}`} className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <Icon aria-hidden className="size-4 text-primary" />
              {skill}
              <span aria-hidden className="ml-6 size-1.5 rounded-full bg-accent" />
            </span>
          );
        })}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export function SkillsSection() {
  const { lang, pick } = useLanguage();

  return (
    <section id="competences" className="scroll-mt-28 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="03" title={pick(ui.sections.skillsTitle)} />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {skills.map((group) => {
            const GroupIcon = GROUP_ICONS[group.key] ?? getTechIcon(group.key);
            return (
              <StaggerItem key={group.key} className="h-full">
              <div className="card-lift h-full rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <motion.span
                    whileHover={{ rotate: [0, -12, 10, 0], scale: 1.12 }}
                    transition={{ duration: 0.5 }}
                    className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground"
                  >
                    <GroupIcon aria-hidden className="size-5" />
                  </motion.span>
                  <h3 className="font-display text-lg font-bold">{pick(group.label)}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items[lang].map((item) => {
                    const Icon = getTechIcon(item);
                    return (
                      <motion.li
                        key={item}
                        whileHover={{ y: -3, scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                      >
                        <Icon aria-hidden className="size-3.5 text-primary" />
                        {item}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
