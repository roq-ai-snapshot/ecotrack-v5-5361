import axios from 'axios';
import queryString from 'query-string';
import { EnvironmentalDataInterface } from 'interfaces/environmental-data';
import { GetQueryInterface } from '../../interfaces';

export const getEnvironmentalData = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/environmental-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEnvironmentalData = async (environmentalData: EnvironmentalDataInterface) => {
  const response = await axios.post('/api/environmental-data', environmentalData);
  return response.data;
};

export const updateEnvironmentalDataById = async (id: string, environmentalData: EnvironmentalDataInterface) => {
  const response = await axios.put(`/api/environmental-data/${id}`, environmentalData);
  return response.data;
};

export const getEnvironmentalDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/environmental-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEnvironmentalDataById = async (id: string) => {
  const response = await axios.delete(`/api/environmental-data/${id}`);
  return response.data;
};
