export type Lang = "en" | "fr";
export type L<T = string> = Record<Lang, T>;

export interface Profil {
  thumbnail: string;
  keywords: L<string[]>;
  informations: { title: L; items: { name: L; icon: string; text: L }[] };
  socials: { title: L; links: { name: L; icon: string; href: string; color?: string }[] };
}
export interface Experience { thumbnail: string; institution: L; url: string; location: L; position: L; period: L }
export interface Education { thumbnail: string; degree: L; institution: L; location: L; period: L; url?: string }
export interface Project {
  name: L; period: L; keywords: L<string[]>; abstract: L; thumbnail: string;
  youtube?: string; vimeo?: string; fundings: L; contributors: L;
}
export interface Course {
  name: L; tools: L; position: L; role: L; type: L; duration: L; status: L;
  level: L; degree: L; cycle: L; school: L; size: number;
}
export interface Coordination {
  name: L; volume: L; period: L; level: L; location: L; type: L;
  aavs: L<string[]>; tools: L<string[]>; responsibilities: L<string[]>;
  links?: { text: L; href: string }[];
}
export interface JuryMember { name: string; role: L; position: L }
export interface Thesis {
  thumbnail: string; pdf: string; ref: L; name: L; title: L; abstract: L; laboratory: L | string; jury: JuryMember[];
}
export interface Publication {
  thumbnail: string; pdf?: string; doi?: string; ref: string;
  submissions?: { name: string; track: string }[]; note?: L; keywords?: L<string[]>;
}
export interface Review { name: L; assigned: string | number; recognized: string | number }
export interface Supervision { name: string; level: L; topic: L; supervisor: L; duration: L; location: L }
export interface Animation { type: L; title: L; description: L; role: L; date: L; location: L }
export interface Mission { thumbnail: string; position: L; period: L }

export interface CvData {
  title: string;
  subtitle: string;
  profil: Profil;
  researchs: { title: L };
  projects: { titles: { title: L; headers: L<string[]> }; items: Project[] };
  experiences: { title: L; items: Experience[] };
  educations: { title: L; items: Education[] };
  teachings: { title: L };
  lectures: { title: L; headers: L<string[]>; items: { year: number; courses: Course[] }[] };
  coordinations: { titles: { title: L; categories: L<string[]> }; items: Coordination[] };
  theses: { titles: { title: L; abstract: L; laboratory: L; jury: L<string[]> }; items: Thesis[] };
  publications: { title: L; categories: { title: L; items: Publication[] }[] };
  reviews: { titles: { title: L; review: L<string[]> }; items: Review[] };
  supervisions: { titles: { title: L; headers: L<string[]> }; items: Supervision[] };
  animations: { titles: { title: L; headers: L<string[]> }; items: Animation[] };
  others: { title: L };
  missions: { title: L; items: Mission[] };
}
