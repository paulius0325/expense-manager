import axios from "axios";
const API_URL = "https://localhost:7100/api";

export const createExpense = (data) =>
  axios.post(`${API_URL}/expense`, data);

export const getExpenses = (category) => {
  if (!category) {
    return axios.get(`${API_URL}/expense`);
  }

  return axios.get(`${API_URL}/expense?category=${category}`);
};

export const deleteExpense = (id) =>
  axios.delete(`${API_URL}/expense/${id}`);

export const updateExpense = (id, data) =>
  axios.put(`${API_URL}/expense/${id}`, data);