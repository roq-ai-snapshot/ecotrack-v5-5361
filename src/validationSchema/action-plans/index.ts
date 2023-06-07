import * as yup from 'yup';
import { employeeContributionValidationSchema } from 'validationSchema/employee-contributions';

export const actionPlanValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  status: yup.string().required(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  business_organization_id: yup.string().nullable().required(),
  employee_contribution: yup.array().of(employeeContributionValidationSchema),
});
