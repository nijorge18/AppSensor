import axios from "axios";

const API_URL = "http://localhost:5000";

export interface SensorHistoryItem {
  id: number;
  temperatura: number;
  humedad: number;
  tipoSensor: string;
  timestamp: string;
}

export const historialService = {
  async getHistory(minutes: number): Promise<SensorHistoryItem[]> {
    const res = await axios.get(`${API_URL}/api/sensor/history`, {
      params: { minutes }
    });
    return res.data;
  },

  async getFrecuencia(): Promise<number> {
    const res = await axios.get(`${API_URL}/config/frecuencia`);
    return res.data.frecuencia;
  }
  , async setFrecuencia(minutes: number): Promise<number> {
    const res = await axios.post(`${API_URL}/config/frecuencia`, {
      frecuencia: minutes,
    });
    return res.data.frecuencia;
  }
};
