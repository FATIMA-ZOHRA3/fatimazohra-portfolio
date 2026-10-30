import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiC,
  SiCplusplus,
  SiNextdotjs,
  SiReact,
  SiExpo,
  SiHtml5,
  SiSpring,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiPytorch,
  SiTensorflow,
  SiHuggingface,
  SiGit,
  SiDocker,
  SiLinux,
  SiOdoo,
  SiPhp,
} from "react-icons/si";
import {
  Boxes,
  Brain,
  Cloud,
  Code2,
  Database,
  Infinity as InfinityIcon,
  ListChecks,
  Map,
  MessageCircleQuestion,
  Monitor,
  Network,
  Server,
  Sparkles,
  Wand2,
  Wrench,
  Braces,
  type LucideIcon,
} from "lucide-react";

export type TechIcon = IconType | LucideIcon;

const ICONS: Record<string, TechIcon> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  python: SiPython,
  java: SiOpenjdk,
  "java spring": SiSpring,
  c: SiC,
  "c++": SiCplusplus,
  sql: SiMysql,
  poo: Boxes,
  "next.js": SiNextdotjs,
  react: SiReact,
  "react native": SiExpo,
  "react native (expo)": SiExpo,
  "html5/css": SiHtml5,
  "spring framework": SiSpring,
  prisma: SiPrisma,
  "api rest": Network,
  microservices: Boxes,
  php: SiPhp,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  sqlite: SiSqlite,
  "machine learning": Brain,
  "deep learning": SiPytorch,
  "deep learning (cnn, nlp)": SiTensorflow,
  "cnn": SiPytorch,
  "nlp": MessageCircleQuestion,
  "rag": SiHuggingface,
  "intégration de llm": Sparkles,
  "prompt engineering": Wand2,
  "git/github": SiGit,
  git: SiGit,
  docker: SiDocker,
  devops: InfinityIcon,
  linux: SiLinux,
  cloud: Cloud,
  odoo: SiOdoo,
  scrum: ListChecks,
  openstreetmap: Map,
  code: Code2,
  braces: Braces,
};

export function getTechIcon(name: string): TechIcon {
  return ICONS[name.toLowerCase()] ?? Code2;
}

export function TechChip({ name, className }: { name: string; className?: string }) {
  const Icon = getTechIcon(name);
  return (
    <span className={className}>
      <Icon aria-hidden className="size-3.5" />
      {name}
    </span>
  );
}

export const GROUP_ICONS: Record<string, LucideIcon> = {
  languages: Code2,
  frontend: Monitor,
  backend: Server,
  databases: Database,
  ai: Brain,
  tools: Wrench,
};
