import { Heart } from "lucide-react";
import { Reveal } from "@/components/motion-kit";

import { profile, ui } from "@/data/portfolio";
import { useLanguage } from "@/lib/language";

export function SiteFooter() {
  const { pick } = useLanguage();
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>{pick(ui.footer)}</p>
        <p className="inline-flex items-center gap-1.5">
          PFE 2027 <Heart aria-hidden className="size-3.5 animate-heartbeat text-primary" /> Web · Mobile · IA
        </p>
      </div>
    </footer>
  );
}
