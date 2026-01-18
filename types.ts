export type UserRole = 'entrepreneur' | 'investor' | 'mentor';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: any;
}

export interface ResearchItem {
  title: string;
  description: string;
}