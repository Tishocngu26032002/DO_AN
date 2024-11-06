import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:6006",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
