import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data/resume.json');

export interface Social {
  name: string;
  icon: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  avatarUrl: string;
  initials: string;
  resumeUrl?: string; // Optional link to resume PDF
  socials: Social[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface Project {
  name: string;
  tech: string[];
  desc: string;
  stars: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  extra?: string;
}

export interface Language {
  lang: string;
  level: string;
  percentage: number;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education: Education[];
  languages: Language[];
}

export async function getResumeData(): Promise<ResumeData | null> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading resume data:', error);
    return null;
  }
}

export async function saveResumeData(data: ResumeData) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saveing resume data:', error);
    return false;
  }
}
