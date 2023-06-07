const mapping: Record<string, string> = {
  'action-plans': 'action_plan',
  'business-organizations': 'business_organization',
  'employee-contributions': 'employee_contribution',
  'environmental-data': 'environmental_data',
  'environmental-goals': 'environmental_goal',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
