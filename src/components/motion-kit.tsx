import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { ArrowUp } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Reveal : apparition douce quand l'élément entre dans l'écran               */
/* -------------------------------------------------------------------------- */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 28, x = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Conteneur dont les enfants <StaggerItem> apparaissent l'un après l'autre. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  ...rest
}: { children: ReactNode; className?: string; as?: "div" | "li" | "article" } & Omit<
  HTMLMotionProps<"div">,
  "children" | "className"
>) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 32, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*  Écran de chargement animé (avant l'affichage de la page)                   */
/* -------------------------------------------------------------------------- */

export function PageLoader({ initials = "FZ" }: { initials?: string }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minDuration = reduce ? 200 : 1800;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / minDuration, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Durée fixe et prévisible : on ne dépend ni des polices ni des images.
    const hide = setTimeout(() => setVisible(false), minDuration + 250);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = visible ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          aria-hidden
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-float-soft absolute -top-24 -left-24 size-96 rounded-full bg-accent/50 blur-3xl" />
            <div className="animate-float-soft absolute right-0 bottom-10 size-80 rounded-full bg-secondary blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            <div className="relative grid size-28 place-items-center">
              <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-border)" strokeWidth="3" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.15, ease: "linear" }}
                />
              </svg>
              <motion.span
                initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                className="grid size-20 place-items-center rounded-3xl bg-sun-strip font-display text-2xl font-extrabold text-primary-foreground shadow-sun"
              >
                {initials}
              </motion.span>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
                className="font-display text-lg font-bold tracking-tight"
              >
                Fatima Zohra <span className="text-primary">Bentouhami</span>
              </motion.p>
            </div>

            <span className="font-display text-xs font-bold tracking-[0.3em] text-muted-foreground tabular-nums">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  Barre de progression de lecture + bouton « retour en haut »                */
/* -------------------------------------------------------------------------- */

export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => scrollY.on("change", (y) => setShowTop(y > 700)), [scrollY]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-sun-strip"
      />
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#top"
            aria-label="Retour en haut / Back to top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-sun-strip text-primary-foreground shadow-sun"
          >
            <ArrowUp className="size-5" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Effets d'interaction                                                       */
/* -------------------------------------------------------------------------- */

/** Incline légèrement l'élément vers la souris (effet 3D). */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 15 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 15 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Le bouton « attire » légèrement le curseur. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Mots qui défilent (Full Stack → Mobile → IA …). */
export function WordRotator({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className ?? ""}`}>
      {/* réserve la largeur du mot le plus long */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Lueur douce qui suit la souris dans une zone (hero). */
export function CursorGlow({ className }: { className?: string }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className={`pointer-events-none fixed top-0 left-0 -z-10 size-[400px] rounded-full bg-primary/15 blur-3xl ${className ?? ""}`}
    />
  );
}
