import * as yup from 'yup';
import { actionPlanValidationSchema } from 'validationSchema/action-plans';
import { environmentalDataValidationSchema } from 'validationSchema/environmental-data';
import { environmentalGoalValidationSchema } from 'validationSchema/environmental-goals';

export const businessOrganizationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  action_plan: yup.array().of(actionPlanValidationSchema),
  environmental_data: yup.array().of(environmentalDataValidationSchema),
  environmental_goal: yup.array().of(environmentalGoalValidationSchema),
});
