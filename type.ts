export interface ArticleMetadata {
  title?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
  created_at?: string;
  updated_at?: string;
  description?: string;
  link?: string;
  image?: string;
}

export type BadgeItem = {
  title: string;
  count: number;
  href: string;
};
