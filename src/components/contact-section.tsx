import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { profile, ui } from "@/data/portfolio";
import { useLanguage } from "@/lib/language";
import { SectionHeading } from "@/components/experience-section";
import { Magnetic, Reveal } from "@/components/motion-kit";

export function ContactSection() {
  const { pick } = useLanguage();

  return (
    <section id="contact" className="scroll-mt-28 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="05" title={pick(ui.sections.contactTitle)} />

        <Reveal y={40}>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-sun-strip p-8 text-primary-foreground shadow-sun sm:p-12">
          <div aria-hidden className="animate-blob pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-white/15 blur-2xl" />
          <div aria-hidden className="animate-blob pointer-events-none absolute -bottom-20 -left-10 size-72 rounded-full bg-white/10 blur-2xl [animation-delay:-6s]" />

          <p className="max-w-2xl font-display text-2xl leading-snug font-bold sm:text-3xl">
            {pick(ui.sections.contactLead)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-bold text-foreground shadow-sun transition-transform hover:scale-[1.03] active:scale-95"
              >
                <Mail className="size-4 animate-wiggle text-primary" />
                {pick(ui.sections.emailMe)}
              </a>
            </Magnetic>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 text-sm font-bold transition-colors hover:bg-white/15"
            >
              <Linkedin className="size-4" /> LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 text-sm font-bold transition-colors hover:bg-white/15"
            >
              <Github className="size-4" /> GitHub
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-primary-foreground/90">
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4" /> {profile.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4" /> {profile.phone}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" /> {pick(profile.location)}
            </span>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
