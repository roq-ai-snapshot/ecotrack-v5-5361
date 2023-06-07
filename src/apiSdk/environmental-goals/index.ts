import axios from 'axios';
import queryString from 'query-string';
import { EnvironmentalGoalInterface } from 'interfaces/environmental-goal';
import { GetQueryInterface } from '../../interfaces';

export const getEnvironmentalGoals = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/environmental-goals${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEnvironmentalGoal = async (environmentalGoal: EnvironmentalGoalInterface) => {
  const response = await axios.post('/api/environmental-goals', environmentalGoal);
  return response.data;
};

export const updateEnvironmentalGoalById = async (id: string, environmentalGoal: EnvironmentalGoalInterface) => {
  const response = await axios.put(`/api/environmental-goals/${id}`, environmentalGoal);
  return response.data;
};

export const getEnvironmentalGoalById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/environmental-goals/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEnvironmentalGoalById = async (id: string) => {
  const response = await axios.delete(`/api/environmental-goals/${id}`);
  return response.data;
};
