export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillSet {
  technical: Skill[];
  soft: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}