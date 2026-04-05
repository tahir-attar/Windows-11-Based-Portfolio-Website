import { ReactNode } from 'react';

export interface IHighlightedProject {
  id?: string;
  order?: number;
  slideNumberImg?: string;
  projectTitle: string;
  projectDescription: string;
  projectImg: string;
  projectMobileImg: string;
  projectTechnologies: string[];
  technologyIcons?: ReactNode[];
  techIconNames?: string[];
  slideBgColor: string;
  slideHeight: string;
  githubLink?: string;
  liveLink: string;
  desktopImgWidth?: number;
  desktopImgHeight?: number;
  mobileImgWidth?: number | null;
  mobileImgHeight?: number | null;
  role?: string;
  goal?: string;
  outcome?: string;
  detailsImg?: string;
}

export interface ICarouselQuote {
  id: number;
  title: string;
  quote: string;
}

export interface IResumeSkill {
  text: string;
  iconUrl: string;
}

export interface IResumeResponsibility {
  text: string;
  iconUrl: string;
  url?: string;
}

export interface IResumeExperience {
  variant: 'withResponsibilities' | 'simple';
  company: string;
  companyImg: string;
  role: string;
  timeFrame: string;
  shortSummary: string;
  responsibilities?: IResumeResponsibility[];
}

export interface IResumeEducation {
  degree: string;
  field: string;
  institution: string;
  duration?: string;
  cgpa?: string;
  percentage?: string;
}

export interface ICertificationBullet {
  text: string;
  iconUrl: string;
  url?: string;
}

export interface ICertification {
  company: string;
  companyImg?: string;
  certificationName: string;
  timeFrame: string;
  description: string;
  url?: string;
  bullets?: ICertificationBullet[];
}

export interface IResumePersonalInfo {
  name: string;
  suffix: string;
  title: string;
  website: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  cvPdfUrl: string;
}

export interface INonTechSkillGroup {
  category: string;
  items: string[];
  iconUrl?: string;
}

export interface IResumeData {
  personalInfo: IResumePersonalInfo;
  summary: string;
  experienceIntro: string;
  keyTechSkills: IResumeSkill[];
  otherSkills: IResumeSkill[];
  nonTechSkills?: INonTechSkillGroup[];
  hobbies?: IResumeSkill[];
  experience: IResumeExperience[];
  education: IResumeEducation[];
  certifications?: ICertification[];
}
