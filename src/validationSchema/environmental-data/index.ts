import * as yup from 'yup';

export const environmentalDataValidationSchema = yup.object().shape({
  carbon_footprint: yup.number().integer().required(),
  energy_consumption: yup.number().integer().required(),
  waste_generation: yup.number().integer().required(),
  recycling_rate: yup.number().integer().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  business_organization_id: yup.string().nullable().required(),
});
