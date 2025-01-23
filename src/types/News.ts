export interface News {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: Date;
  updated_at: Date;
  featured: boolean;
  launches: Launch[];
  events: null;
}

interface Author {
  name: string;
  socials: null;
}

interface Launch {
  launch_id: string;
  provider: string;
}
