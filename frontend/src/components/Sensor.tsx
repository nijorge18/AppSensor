import React, { useState, useEffect } from "react";

const Sensor: React.FC = () => {
  const [humidity, setHumidity] = useState(72);
  const [temperature, setTemperature] = useState(22);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulación de lectura del sensor
      setHumidity(Math.floor(60 + Math.random() * 20));
      setTemperature(Math.floor(20 + Math.random() * 5));
    }, 2000);
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
          <h1 className="fw-bold text-success">{humidity}%</h1>
          <p className="text-muted">Humedad relativa</p>

          <h1 className="fw-bold text-primary">{temperature}°C</h1>
          <p className="text-muted">Temperatura</p>
        </div>

        <div className="progress" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${humidity}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sensor;
