export interface Detail {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: Date;
  featured: boolean;
  launches: unknown;
  events: unknown;
}

interface Author {
  name: string;
  socials: null;
}
