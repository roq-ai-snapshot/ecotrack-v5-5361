import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface EnvironmentalGoalInterface {
  id?: string;
  goal_type: string;
  target_value: number;
  current_value: number;
  start_date: Date;
  end_date: Date;
  business_organization_id: string;
  created_at?: Date;
  updated_at?: Date;

  business_organization?: BusinessOrganizationInterface;
  _count?: {};
}
