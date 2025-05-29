export interface IBlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  tags?: string[];
 
}