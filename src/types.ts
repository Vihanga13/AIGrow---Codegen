export type PageId = 
  | 'home' 
  | 'services' 
  | 'services-greenhouse' 
  | 'services-indoor-farming' 
  | 'services-home-gardening' 
  | 'services-fresh-produce' 
  | 'products' 
  | 'products-environmental' 
  | 'products-resource' 
  | 'products-irrigation' 
  | 'about' 
  | 'about-story' 
  | 'about-commitment' 
  | 'about-news' 
  | 'projects'
  | 'contact'
  | 'shop'
  | 'privacy'
  | 'terms';

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string; // lucide icon name
  features: string[];
  subCategories?: {
    name: string;
    description: string;
    details: string[];
  }[];
  process?: {
    step: string;
    title: string;
    description: string;
  }[];
}

export interface Product {
  id: string;
  name: string;
  category: 'environmental' | 'resource' | 'irrigation';
  categoryLabel: string;
  catchphrase: string;
  description: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
  price?: string; // For the Shop page
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  fullDescription: string;
  image: string;
  stats: {
    label: string;
    value: string;
  }[];
  outcomes: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  readTime: string;
  image: string;
}
