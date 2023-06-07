import { ActionPlanInterface } from 'interfaces/action-plan';
import { EnvironmentalDataInterface } from 'interfaces/environmental-data';
import { EnvironmentalGoalInterface } from 'interfaces/environmental-goal';
import { UserInterface } from 'interfaces/user';

export interface BusinessOrganizationInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  action_plan?: ActionPlanInterface[];
  environmental_data?: EnvironmentalDataInterface[];
  environmental_goal?: EnvironmentalGoalInterface[];
  user?: UserInterface;
  _count?: {
    action_plan?: number;
    environmental_data?: number;
    environmental_goal?: number;
  };
}
