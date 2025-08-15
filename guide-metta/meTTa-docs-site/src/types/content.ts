export type TemplateCategory = 'tutorial' | 'project' | 'reference';

export interface ContentTemplate {
  id: string;
  title: string;
  description: string;
  template: string;
  category: TemplateCategory;
}
