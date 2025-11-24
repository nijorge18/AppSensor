import React, { useState, useEffect } from "react";
import { sensorService } from "../services/SensorService";

const Sensor: React.FC = () => {
  const [humidity, setHumidity] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const sensor = await sensorService.getSensorData();

        if (sensor) {
          const h = sensor.humedad;
          setHumidity(h);
          setTemperature(sensor.temperatura);

          if (h > 55) {
            setAlertMessage("⚠️ La humedad sobrepasa el rango óptimo (>55%).");
          } else if (h < 45) {
            setAlertMessage("⚠️ La humedad está bajo el rango óptimo (<45%).");
          } else if (h >= 45 && h <= 55) {
            setAlertMessage("La humedad está en óptimo estado");
          } else {
            setAlertMessage("");
          }
        }
      } catch (error) {
        console.error("Error al obtener datos del sensor:", error);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card shadow-sm w-100 h-100">
      <div className="card-body d-flex flex-column justify-content-between">

        {}
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-primary btn-sm fw-bold">
            Conectar sensor
          </button>
        </div>

        <div>
          <h5 className="card-title text-success text-center mb-3">
            🌡️ Sensor Ambiental
          </h5>
          <p className="text-muted text-center small">
            Datos en tiempo real de humedad y temperatura.
          </p>
        </div>

        {}
        {alertMessage && (
          <div
            className={`alert text-center fw-bold ${
              humidity !== null && humidity >= 45 && humidity <= 55
                ? "alert-success"
                : "alert-danger"
            }`}
            role="alert"
          >
            {alertMessage}
          </div>
        )}

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
