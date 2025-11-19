import axios from "axios";

const API_URL = "http://localhost:5000";

export interface SensorData {
  humedad: number;
  temperatura: number;
}

export const sensorService = {
  async getSensorData(): Promise<SensorData | null> {
    const res = await axios.get(`${API_URL}/sensor`);
    const data = res.data;

    if (Array.isArray(data) && data.length > 0) {
      return {
        humedad: data[0].humedad,
        temperatura: data[0].temperatura
      };
    }

    return null;
  }
};
