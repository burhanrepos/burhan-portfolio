export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  pdfUrl?: string;
  imageUrl?: string;
  stars?: number;
  forks?: number;
}

export interface Handbook {
  id: string;
  title: string;
  tech: string;
  description: string;
  coverColor: string;
  githubUrl: string;
  chaptersCount: number;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  duration: string;
  highlights: string[];
  techUsed: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}
