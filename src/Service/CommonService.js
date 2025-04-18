import apiClient from "./AxiosService";

export const postApi = (url ,data) => {
  return apiClient.post(url, data);
};

export const getAllUsers = (url) => {
  return apiClient.get(url);
};

export const getApi = (url) => {
  return apiClient.get(url);
};

export const putApi = (url, data) => {
  return apiClient.put(url, data);
};

