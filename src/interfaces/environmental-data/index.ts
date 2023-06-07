import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface EnvironmentalDataInterface {
  id?: string;
  carbon_footprint: number;
  energy_consumption: number;
  waste_generation: number;
  recycling_rate: number;
  business_organization_id: string;
  created_at?: Date;
  updated_at?: Date;

  business_organization?: BusinessOrganizationInterface;
  _count?: {};
}
