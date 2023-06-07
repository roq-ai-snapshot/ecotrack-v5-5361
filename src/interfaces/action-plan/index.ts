import { EmployeeContributionInterface } from 'interfaces/employee-contribution';
import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface ActionPlanInterface {
  id?: string;
  title: string;
  description: string;
  status: string;
  start_date: Date;
  end_date: Date;
  business_organization_id: string;
  created_at?: Date;
  updated_at?: Date;
  employee_contribution?: EmployeeContributionInterface[];
  business_organization?: BusinessOrganizationInterface;
  _count?: {
    employee_contribution?: number;
  };
}
