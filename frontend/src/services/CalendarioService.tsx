import axios from "axios";

const API_URL = "http://localhost:5000";

export interface CalendarioPayload {
  days: string[];
  time: string;
}

export const calendarioService = {
  async guardarCalendario(data: CalendarioPayload) {
    const res = await axios.post(`${API_URL}/calendario`, data);
    return res.data;
  }
};
