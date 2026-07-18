export interface NavItem {
  title: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SkillItem {
  name: string;
  level: string;
  category: SkillCategory;
}

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools";

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  featured: boolean;
  tech: string[];
  features: string[];
  liveUrl: string;
  repoUrl: string;
  problem: string;
  solution: string;
  challenges: string[];
}

export interface Service {
  title: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  phone?: string;
  message: string;
}
