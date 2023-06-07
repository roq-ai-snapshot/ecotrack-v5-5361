import { UserInterface } from 'interfaces/user';
import { ActionPlanInterface } from 'interfaces/action-plan';

export interface EmployeeContributionInterface {
  id?: string;
  employee_id: string;
  action_plan_id: string;
  contribution_value: number;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  action_plan?: ActionPlanInterface;
  _count?: {};
}
