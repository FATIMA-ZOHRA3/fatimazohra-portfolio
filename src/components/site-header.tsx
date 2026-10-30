import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Github, Linkedin, Menu, X } from "lucide-react";

import { profile, ui } from "@/data/portfolio";
import { useLanguage } from "@/lib/language";

export function SiteHeader() {
  const { lang, setLang, pick } = useLanguage();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const links = [
    { href: "#experience", label: pick(ui.nav.experience) },
    { href: "#projets", label: pick(ui.nav.projects) },
    { href: "#competences", label: pick(ui.nav.skills) },
    { href: "#formation", label: pick(ui.nav.education) },
    { href: "#contact", label: pick(ui.nav.contact) },
  ];

  useEffect(() => setOpen(false), [lang]);

  // Section visible à l'écran -> met en avant le lien correspondant
  useEffect(() => {
    const ids = ["experience", "projets", "competences", "formation", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2 }}
    >
      <div className="mx-auto mt-3 flex max-w-5xl items-center justify-between rounded-4xl border border-border/70 bg-card/80 px-4 py-2.5 shadow-sun backdrop-blur-md sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-2xl bg-sun-strip font-display text-sm font-extrabold text-primary-foreground shadow-sun">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm font-bold tracking-tight sm:block">
            Fatima Zohra <span className="text-primary">Bentouhami</span>
          </span>
        </a>

        <nav aria-label="Principale" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                active === link.href.slice(1) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {active === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-secondary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Langue / Language"
            className="flex items-center rounded-full border border-border bg-muted p-0.5"
          >
            {(["fr", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase transition-all ${
                  lang === code
                    ? "bg-sun-strip text-primary-foreground shadow-sun"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:grid"
          >
            <Github className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:grid"
          >
            <Linkedin className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-5xl rounded-3xl border border-border bg-card/95 p-2 shadow-sun backdrop-blur-md md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
