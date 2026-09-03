export type ClothingTemplateId = 'style-01' | 'style-02' | 'style-03';

export type TemplateStatus = 'available' | 'coming-soon';

export interface ClothingTemplateDefinition {
  id: ClothingTemplateId;
  displayName: string;
  description: string;
  route: `/clothing/${ClothingTemplateId}`;
  status: TemplateStatus;
  visualLabel: string;
}
