import axios from "axios";
const API_URL = "http://localhost:5123/api";
export const getExpenses = () => axios.get(`${API_URL}/expenses`);