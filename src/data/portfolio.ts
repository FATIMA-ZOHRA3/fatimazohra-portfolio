export type Lang = "fr" | "en";

export const profile = {
  name: "Fatima Zohra Bentouhami",
  initials: "FZB",
  email: "fatimazohrabentouhami46@gmail.com",
  phone: "+212 719 841 312",
  github: "https://github.com/FATIMA-ZOHRA3",
  linkedin: "https://www.linkedin.com/in/fatima-zohra-bentouhami-48b4a3309",
  location: { fr: "Maroc, permis B", en: "Morocco, driving licence B" } as Record<Lang, string>,
};

export const experience = {
  repo: "https://github.com/FATIMA-ZOHRA3/boekhouder",
  title: {
    fr: "Stagiaire PFA, développement full-stack web & mobile",
    en: "PFA Intern, full-stack web & mobile development",
  } as Record<Lang, string>,
  company: {
    fr: "QS Administration (Pays-Bas, à distance)",
    en: "QS Administration (Netherlands, remote)",
  } as Record<Lang, string>,
  period: { fr: "Juillet – septembre 2026", en: "July – September 2026" } as Record<Lang, string>,
  summary: {
    fr: "Plateforme de gestion comptable web et mobile pour clients et comptables.",
    en: "Web and mobile accounting platform for clients and accountants.",
  } as Record<Lang, string>,
  points: {
    fr: [
      "Livré 9 modules back-end/full-stack en 2 mois : factures, devis, paiements, achats, banque, écritures comptables, TVA, tâches, messagerie.",
      "Analysé l’application existante (workflows comptables, schéma Prisma, authentification, autorisations), puis géré la base PostgreSQL via Prisma.",
      "Intégré 8 fonctionnalités IA côté serveur : reconnaissance de factures, catégories comptables, brouillons de réponse, résumés, explications fiscales, facturation vocale.",
      "Développé l’application mobile React Native/Expo pour 2 rôles (client, comptable) : navigation par rôle, scan de documents, refonte UI/UX, accès contrôlé côté serveur.",
      "Structuré web et mobile autour d’une seule API REST et d’un monorepo (Next.js, React, React Native, TypeScript, PostgreSQL, Prisma).",
    ],
    en: [
      "Delivered 9 back-end/full-stack modules in 2 months: invoices, quotes, payments, purchases, banking, accounting entries, VAT, tasks, messaging.",
      "Analysed the existing application (accounting workflows, Prisma schema, authentication, authorisations), then managed the PostgreSQL database via Prisma.",
      "Integrated 8 server-side AI features: invoice recognition, accounting categories, reply drafts, summaries, tax explanations, voice invoicing.",
      "Built the React Native/Expo mobile app for 2 roles (client, accountant): role-based navigation, document scanning, UI/UX redesign, server-controlled access.",
      "Structured web and mobile around a single REST API and one monorepo (Next.js, React, React Native, TypeScript, PostgreSQL, Prisma).",
    ],
  } as Record<Lang, string[]>,
};

export type Project = {
  year: number;
  title: Record<Lang, string>;
  cat: "Web" | "IA" | "Java";
  status?: Record<Lang, string>;
  img?: string;
  alt?: Record<Lang, string>;
  text: Record<Lang, string>;
  stack: string[];
  repo?: string;
};

export const projects: Project[] = [
  {
    year: 2026,
    title: { fr: "Plateforme de gestion comptable web et mobile", en: "Web & mobile accounting platform" },
    cat: "Web",
    text: {
      fr: "Application pour clients et comptables : factures, devis, paiements, TVA et fonctionnalités IA, avec une API REST unique pour le web et le mobile.",
      en: "App for clients and accountants: invoices, quotes, payments, VAT and AI features, with a single REST API for web and mobile.",
    },
    stack: ["Next.js", "React Native", "TypeScript", "PostgreSQL", "Prisma"],
    repo: "https://github.com/FATIMA-ZOHRA3/boekhouder",
  },
  {
    year: 2026,
    title: { fr: "Analyse de CV et préparation aux entretiens", en: "CV analysis & interview preparation" },
    cat: "IA",
    status: { fr: "En cours", en: "In progress" },
    text: {
      fr: "Application mobile qui compare un CV à une offre, recommande des améliorations et propose des simulations d’entretien évaluées par IA.",
      en: "Mobile app that compares a CV with a job offer, recommends improvements and offers AI-graded mock interviews.",
    },
    stack: ["Java Spring", "PostgreSQL", "RAG"],
  },
  {
    year: 2026,
    title: { fr: "Assistant médical en darija", en: "Medical assistant in Darija" },
    img: "/images/projects/darija.webp",
    alt: {
      fr: "Interface de l’assistant médical en darija",
      en: "Interface of the Darija medical assistant",
    },
    cat: "IA",
    text: {
      fr: "Recherche sémantique sur plus de 100 000 questions-réponses médicales, avec réponses en texte et en voix.",
      en: "Semantic search over 100,000+ medical Q&A pairs, with text and voice answers.",
    },
    stack: ["NLP", "RAG", "Deep Learning"],
  },
  {
    year: 2026,
    title: { fr: "Gestion des inscriptions aux cours", en: "Course enrolment management" },
    img: "/images/projects/edugate.webp",
    alt: {
      fr: "Tableau de bord EduGate : étudiants, cours et inscriptions récentes",
      en: "EduGate dashboard: students, courses and recent enrolments",
    },
    cat: "Web",
    text: {
      fr: "Plateforme découpée en services indépendants pour la scalabilité et la maintenabilité.",
      en: "Platform split into independent services for scalability and maintainability.",
    },
    stack: ["Microservices"],
    repo: "https://github.com/FATIMA-ZOHRA3/microservices-project",
  },
  {
    year: 2026,
    title: { fr: "Détection précoce des maladies des plantes", en: "Early plant-disease detection" },
    img: "/images/projects/plantes.webp",
    alt: {
      fr: "Page d’accueil PlantHub pour la détection des maladies des plantes",
      en: "PlantHub homepage for plant-disease detection",
    },
    cat: "IA",
    text: {
      fr: "Modèle CNN qui analyse des images de feuilles pour repérer les maladies tôt.",
      en: "CNN model that analyses leaf images to spot diseases early.",
    },
    stack: ["Deep Learning", "CNN"],
  },
  {
    year: 2025,
    title: { fr: "Simulation du trafic routier", en: "Road-traffic simulation" },
    img: "/images/projects/trafic.webp",
    alt: {
      fr: "Application Traffic Monitor affichant une carte de Casablanca et les options d’itinéraire",
      en: "Traffic Monitor app showing a Casablanca map and route options",
    },
    cat: "Java",
    text: {
      fr: "Carte réelle, modélisation des flux de véhicules et visualisation animée.",
      en: "Real map, vehicle-flow modelling and animated visualisation.",
    },
    stack: ["Java", "OpenStreetMap"],
    repo: "https://github.com/FATIMA-ZOHRA3/SIMJAVA",
  },
  {
    year: 2024,
    title: { fr: "Affectation des enseignants", en: "Teacher assignment platform" },
    img: "/images/projects/eservices.webp",
    alt: {
      fr: "Tableau de bord de la plateforme e-Services",
      en: "e-Services platform dashboard",
    },
    cat: "Web",
    text: {
      fr: "Affectation automatisée des cours, emplois du temps et interface d’administration.",
      en: "Automated course assignment, timetables and an admin interface.",
    },
    stack: ["PHP", "MySQL", "JavaScript"],
  },
];

export type SkillGroup = {
  key: string;
  label: Record<Lang, string>;
  items: Record<Lang, string[]>;
};

export const skills: SkillGroup[] = [
  {
    key: "languages",
    label: { fr: "Langages", en: "Languages" },
    items: {
      fr: ["TypeScript", "JavaScript", "Python", "Java", "C", "C++", "SQL", "POO"],
      en: ["TypeScript", "JavaScript", "Python", "Java", "C", "C++", "SQL", "OOP"],
    },
  },
  {
    key: "frontend",
    label: { fr: "Front-end", en: "Front-end" },
    items: {
      fr: ["Next.js", "React", "React Native (Expo)", "HTML5/CSS"],
      en: ["Next.js", "React", "React Native (Expo)", "HTML5/CSS"],
    },
  },
  {
    key: "backend",
    label: { fr: "Back-end", en: "Back-end" },
    items: {
      fr: ["Spring Framework", "Prisma", "API REST", "Microservices", "PHP"],
      en: ["Spring Framework", "Prisma", "REST API", "Microservices", "PHP"],
    },
  },
  {
    key: "databases",
    label: { fr: "Bases de données", en: "Databases" },
    items: {
      fr: ["PostgreSQL", "MySQL", "SQLite"],
      en: ["PostgreSQL", "MySQL", "SQLite"],
    },
  },
  {
    key: "ai",
    label: { fr: "Intelligence artificielle", en: "Artificial intelligence" },
    items: {
      fr: ["Machine Learning", "Deep Learning (CNN, NLP)", "RAG", "Intégration de LLM", "Prompt engineering"],
      en: ["Machine Learning", "Deep Learning (CNN, NLP)", "RAG", "LLM integration", "Prompt engineering"],
    },
  },
  {
    key: "tools",
    label: { fr: "Outils", en: "Tools" },
    items: {
      fr: ["Git/GitHub", "Docker", "DevOps", "Linux", "Cloud", "Odoo", "Scrum"],
      en: ["Git/GitHub", "Docker", "DevOps", "Linux", "Cloud", "Odoo", "Scrum"],
    },
  },
];

export const education: { period: string; title: Record<Lang, string>; school: Record<Lang, string> }[] = [
  {
    period: "2024 – 2027",
    title: { fr: "Cycle ingénieur en génie informatique", en: "Engineering degree in computer engineering" },
    school: { fr: "ENSA Al Hoceima (ENSAH)", en: "ENSA Al Hoceima (ENSAH)" },
  },
  {
    period: "2022 – 2024",
    title: { fr: "Classes préparatoires aux grandes écoles (CPGE MP)", en: "Preparatory classes for engineering schools (CPGE MP)" },
    school: { fr: "", en: "" },
  },
  {
    period: "2022",
    title: { fr: "Baccalauréat Sciences Physiques, option Français", en: "Baccalaureate in Physical Sciences, French option" },
    school: { fr: "Mention Très Bien", en: "With highest honours" },
  },
];

export const spokenLanguages = {
  fr: "Arabe (langue maternelle), français (professionnel), anglais (technique)",
  en: "Arabic (native), French (professional), English (technical)",
} as Record<Lang, string>;

export const marqueeSkills = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Python",
  "Java",
  "Spring",
  "PostgreSQL",
  "Prisma",
  "Deep Learning",
  "NLP",
  "RAG",
  "LLM",
  "Docker",
  "Git",
];

export const ui = {
  nav: {
    experience: { fr: "Expérience", en: "Experience" } as Record<Lang, string>,
    projects: { fr: "Projets", en: "Projects" } as Record<Lang, string>,
    skills: { fr: "Compétences", en: "Skills" } as Record<Lang, string>,
    education: { fr: "Formation", en: "Education" } as Record<Lang, string>,
    contact: { fr: "Contact", en: "Contact" } as Record<Lang, string>,
  },
  hero: {
    kicker: { fr: "Élève-ingénieure en génie logiciel · ENSAH", en: "Software engineering student · ENSAH" } as Record<Lang, string>,
    pitch: {
      fr: "Je construis des applications web et mobile avec de l’IA intégrée, du back-end jusqu’à l’interface. Je cherche un stage de fin d’études (PFE) en Full Stack Web/Mobile & IA.",
      en: "I build web and mobile applications with integrated AI, from back-end to interface. I am looking for a final-year internship (PFE) in Full Stack Web/Mobile & AI.",
    } as Record<Lang, string>,
    ctaProjects: { fr: "Voir mes projets", en: "See my projects" } as Record<Lang, string>,
    ctaCv: { fr: "Télécharger le CV", en: "Download CV" } as Record<Lang, string>,
    available: { fr: "Disponible pour un PFE 2027", en: "Available for a 2027 final-year internship" } as Record<Lang, string>,
  },
  sections: {
    experienceTitle: { fr: "Expérience", en: "Experience" } as Record<Lang, string>,
    projectsTitle: { fr: "Projets", en: "Projects" } as Record<Lang, string>,
    projectsMore: {
      fr: "Le code est disponible sur mon GitHub.",
      en: "The code is available on my GitHub.",
    } as Record<Lang, string>,
    viewCode: { fr: "Voir le code", en: "View code" } as Record<Lang, string>,
    skillsTitle: { fr: "Compétences", en: "Skills" } as Record<Lang, string>,
    educationTitle: { fr: "Formation", en: "Education" } as Record<Lang, string>,
    languagesLabel: { fr: "Langues", en: "Languages" } as Record<Lang, string>,
    contactTitle: { fr: "Parlons de mon PFE", en: "Let's talk about my internship" } as Record<Lang, string>,
    contactLead: {
      fr: "Je suis disponible pour un stage de fin d’études en développement full stack web/mobile et IA.",
      en: "I am available for a final-year internship in full-stack web/mobile development and AI.",
    } as Record<Lang, string>,
    emailMe: { fr: "Écrire un e-mail", en: "Send an e-mail" } as Record<Lang, string>,
    highlights: { fr: "Points forts", en: "Highlights" } as Record<Lang, string>,
  },
  voice: {
    open: { fr: "Écouter ma présentation", en: "Hear my intro" } as Record<Lang, string>,
    hint: { fr: "robot vocal", en: "voice robot" } as Record<Lang, string>,
    preparing: { fr: "Préparation de la voix…", en: "Getting ready…" } as Record<Lang, string>,
    playing: { fr: "Je me présente !", en: "Introducing myself!" } as Record<Lang, string>,
    error: { fr: "Voix indisponible", en: "Voice unavailable" } as Record<Lang, string>,
  },
  footer: { fr: "© 2026 Fatima Zohra Bentouhami", en: "© 2026 Fatima Zohra Bentouhami" } as Record<Lang, string>,
};

export const voiceIntro = {
  fr: "D’un ton chaleureux et dynamique : Je suis Fatima Zohra Bentouhami, en dernière année du cycle ingénieur en génie logiciel à l’ENSA d’Al Hoceima. Je construis des applications web et mobile avec de l’IA. Lors de mon stage chez QS Administration, aux Pays-Bas, j’ai livré 9 modules back-end et full-stack, et intégré 8 fonctionnalités d’IA sur une plateforme comptable. Je travaille aussi sur des projets de RAG, de NLP et de deep learning. Je cherche un PFE en 2027, en développement full stack ou en IA.",
  en: "In a warm, upbeat tone: I'm Fatima Zohra Bentouhami, a final-year software engineering student at ENSA Al Hoceima. I build web and mobile applications with AI. During my internship at QS Administration, in the Netherlands, I delivered 9 back-end and full-stack modules, and integrated 8 AI features into an accounting platform. I also work on RAG, NLP and deep learning projects. I'm looking for a 2027 final-year internship (PFE) in full-stack development or AI.",
} as Record<Lang, string>;
