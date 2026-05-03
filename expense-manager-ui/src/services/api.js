import axios from "axios";
const API_URL = "https://localhost:7100/api";

export const handleError = (err) => {
  if (err.response?.data?.error)
    return err.response.data.error;

  if (err.response?.data)
    return err.response.data;

  if (err.request)
    return "Server unreachable";

  return "Something went wrong";
};

export const createExpense = (data) =>
  axios.post(`${API_URL}/expense`, data);

export const getExpenses = (category, title) => {
  let url = `${API_URL}/expense`;

  const params = [];

  if (category) params.push(`category=${category}`);
  if (title) params.push(`title=${title}`);

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  return axios.get(url);
};

export const deleteExpense = (id) =>
  axios.delete(`${API_URL}/expense/${id}`);

export const updateExpense = (id, data) =>
  axios.put(`${API_URL}/expense/${id}`, data);