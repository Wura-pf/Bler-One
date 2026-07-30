import { dashboardStats } from "../data/dashboard";
import { api } from "../lib/api";

export const dashboardService = {
  async getStats() {
    // Futuramente será:
    // const response = await api.get("/dashboard");
    // return response.data;

    return dashboardStats;
  },
};