import axios from 'axios';
import queryString from 'query-string';
import { EmployeeContributionInterface } from 'interfaces/employee-contribution';
import { GetQueryInterface } from '../../interfaces';

export const getEmployeeContributions = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/employee-contributions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEmployeeContribution = async (employeeContribution: EmployeeContributionInterface) => {
  const response = await axios.post('/api/employee-contributions', employeeContribution);
  return response.data;
};

export const updateEmployeeContributionById = async (
  id: string,
  employeeContribution: EmployeeContributionInterface,
) => {
  const response = await axios.put(`/api/employee-contributions/${id}`, employeeContribution);
  return response.data;
};

export const getEmployeeContributionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/employee-contributions/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteEmployeeContributionById = async (id: string) => {
  const response = await axios.delete(`/api/employee-contributions/${id}`);
  return response.data;
};
