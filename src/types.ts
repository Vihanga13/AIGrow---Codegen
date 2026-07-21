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
  // Dedicated single-product detail pages (one route per product)
  | 'product-smart-climate'
  | 'product-grow-light'
  | 'product-humidifier'
  | 'product-soil-moisture'
  | 'product-ec-ph-meter'
  | 'product-energy-meter'
  | 'product-water-meter'
  | 'product-fertigation-system'
  | 'product-plant-feeder'
  | 'product-smart-dripper'
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
  /** Primary hero shot, used on the service card, detail hero, and home page. */
  image?: string;
  /** Full photo set for the detail page, including the primary shot. */
  gallery?: string[];
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
