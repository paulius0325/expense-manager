import axios from "axios";
const API_URL = "https://localhost:7100/api";

export const createExpense = (data) =>
  axios.post(`${API_URL}/expense`, data);

export const getExpenses = () =>
  axios.get(`${API_URL}/expense`);

export const deleteExpense = (id) =>
  axios.delete(`${API_URL}/expense/${id}`);