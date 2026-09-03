import type { ClothingTemplateId } from '../types/template.types';

export const routes = {
  selector: '/',
  clothing: (template: ClothingTemplateId) => `/clothing/${template}`,
  product: (template: ClothingTemplateId, slug: string) => `/clothing/${template}/product/${slug}`,
} as const;
