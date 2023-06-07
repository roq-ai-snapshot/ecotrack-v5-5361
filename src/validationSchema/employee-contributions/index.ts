import * as yup from 'yup';

export const employeeContributionValidationSchema = yup.object().shape({
  contribution_value: yup.number().integer().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  employee_id: yup.string().nullable().required(),
  action_plan_id: yup.string().nullable().required(),
});
