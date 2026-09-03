import type { ClothingTemplateDefinition } from '../types/template.types';

export const clothingTemplates: ClothingTemplateDefinition[] = [
  {
    id: 'style-01',
    displayName: 'Editorial Boutique',
    description: 'Warm, refined and fashion-led.',
    route: '/clothing/style-01',
    status: 'available',
    visualLabel: 'Ivory · Serif · Gold',
  },
  {
    id: 'style-02',
    displayName: 'Urban Minimal',
    description: 'Clean, modern and retail-focused.',
    route: '/clothing/style-02',
    status: 'available',
    visualLabel: 'White · Charcoal · Olive',
  },
  {
    id: 'style-03',
    displayName: 'Neo Spatial',
    description: '3D, modern and fashion-tech.',
    route: '/clothing/style-03',
    status: 'available',
    visualLabel: 'Graphite · Spatial · Lime',
  },
];
