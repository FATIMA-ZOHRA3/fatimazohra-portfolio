import { profile, ui } from "@/data/portfolio";
import { useLanguage } from "@/lib/language";
import heroIllustration from "@/assets/hero-tech.png";
import { VoiceIntro } from "@/components/voice-intro";
import { Github, Linkedin, Download, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Magnetic, Tilt, WordRotator } from "@/components/motion-kit";

const FLOATING = ["React", "TypeScript", "RAG", "Next.js", "LLM", "PostgreSQL"];

const EASE = [0.22, 1, 0.36, 1] as const;
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  const { pick, lang } = useLanguage();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 60]);
  const blobY = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -top-24 -left-24 size-96 rounded-full bg-accent/50 blur-3xl" />
        <div className="animate-blob absolute top-40 right-0 size-80 rounded-full bg-secondary blur-3xl [animation-delay:-4s]" />
        <div className="animate-blob absolute bottom-0 left-1/3 size-72 rounded-full bg-accent/40 blur-3xl [animation-delay:-8s]" />
      </motion.div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 2.1 } } }}
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-secondary px-4 py-1.5 text-xs font-bold text-accent-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {pick(ui.hero.available)}
          </motion.span>

          <motion.h1 variants={item} className="mt-5 font-display text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Fatima Zohra
            <br />
            <span className="inline-flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="text-gradient-sun animate-gradient-shift">Bentouhami</span>
              <VoiceIntro />
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 font-display text-xl font-bold text-foreground sm:text-2xl">
            <span className="text-muted-foreground">{lang === "en" ? "Student engineer · " : "Élève-ingénieure · "}</span>
            <WordRotator words={["Full Stack", "Web", "Mobile", lang === "en" ? "AI" : "IA"]} className="text-primary" />
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {pick(ui.hero.pitch)}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projets"
                className="btn-shine group inline-flex items-center gap-2 rounded-full bg-sun-strip px-6 py-3 text-sm font-bold text-primary-foreground shadow-sun transition-transform hover:scale-[1.03] active:scale-95"
              >
                {pick(ui.hero.ctaProjects)}
                <ArrowDown className="size-4 animate-bounce-y" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={lang === "en" ? "/CV_Bentouhami_EN.pdf" : "/CV_Bentouhami.pdf"}
                download
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/15 bg-card px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                <Download className="size-4" />
                {pick(ui.hero.ctaCv)}
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-4" /> GitHub
            </a>
            <span aria-hidden className="size-1 rounded-full bg-border" />
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="size-4" /> LinkedIn
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 2.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute inset-6 -z-10 rounded-[3rem] bg-sun-strip opacity-20 blur-2xl"
          />
          <Tilt>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-secondary via-card to-accent/40 shadow-sun">
              <img
                src={heroIllustration}
                alt="Illustration : code, base de données, graphiques et assistant IA"
                width={1024}
                height={1280}
                className="animate-ken-burns size-full object-cover"
              />
            </div>
          </Tilt>
          {FLOATING.map((tech, i) => (
            <span
              key={tech}
              aria-hidden
              style={{ animationDelay: `${i * 0.7}s` }}
              className={`animate-float-soft absolute rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-xs font-bold text-foreground shadow-sun backdrop-blur ${
                [
                  "-left-2 top-10",
                  "-right-3 top-24",
                  "-left-4 bottom-28",
                  "-right-2 bottom-40",
                  "left-6 -top-4",
                  "right-8 -top-3",
                ][i]
              }`}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
