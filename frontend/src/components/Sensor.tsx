import React, { useState, useEffect } from "react";
import axios from "axios";

const Sensor: React.FC = () => {
  const [humidity, setHumidity] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sensor");
        const data = response.data;

        if (data.length > 0) {
          const ultimo = data[0]; // último registro
          setHumidity(ultimo.humedad);
          setTemperature(ultimo.temperatura);
        }
      } catch (error) {
        console.error("Error al obtener datos del sensor:", error);
      }
    };

    // Llamar una vez al inicio y luego cada 10 s
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card shadow-sm w-100 h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title text-success text-center mb-3">
            🌡️ Sensor Ambiental
          </h5>
          <p className="text-muted text-center small">
            Datos en tiempo real de humedad y temperatura.
          </p>
        </div>

        <div className="text-center my-4">
          <h1 className="fw-bold text-success">
            {humidity !== null ? `${humidity}%` : "Cargando..."}
          </h1>
          <p className="text-muted">Humedad relativa</p>

          <h1 className="fw-bold text-primary">
            {temperature !== null ? `${temperature}°C` : "Cargando..."}
          </h1>
          <p className="text-muted">Temperatura</p>
        </div>

        {humidity !== null && (
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${humidity}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sensor;
