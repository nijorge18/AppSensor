import React, { useEffect, useState } from "react";
import { historialService } from "../services/HistorialService";
import type { SensorHistoryItem } from "../services/HistorialService";

const Historial: React.FC = () => {
  const [history, setHistory] = useState<SensorHistoryItem[]>([]);
  const [frecuencia, setFrecuencia] = useState<number>(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const loadConfig = async () => {
      const freq = await historialService.getFrecuencia();
      setFrecuencia(freq);
    };

    loadConfig();
  }, []);


  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      const data = await historialService.getHistory(frecuencia);
      setHistory(data);
      setLoading(false);
    };

    loadHistory();

    const interval = setInterval(loadHistory, frecuencia * 60 * 1000);

    return () => clearInterval(interval);
  }, [frecuencia]);

  // Guardar nueva frecuencia en backend
  const handleFrecuenciaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevaFrecuencia = Number(e.target.value);
    setFrecuencia(nuevaFrecuencia);
    await historialService.setFrecuencia(nuevaFrecuencia);
  };

  return (
    <div className="card shadow-sm w-100 h-100">
      <div className="card-body">
        <h5 className="card-title text-primary mb-3">📊 Historial del Sensor</h5>

        {/* SELECT DE FRECUENCIA */}
        <div className="mb-3">
          <label className="form-label">Actualizar cada:</label>
          <select
            className="form-control w-auto"
            value={frecuencia}
            onChange={handleFrecuenciaChange}
          >
            <option value={1}>1 minuto</option>
            <option value={2}>2 minutos</option>
            <option value={3}>3 minutos</option>
            <option value={4}>4 minutos</option>
            <option value={5}>5 minutos</option>
          </select>
        </div>

        <p className="text-muted">
          Actualización automática cada <b>{frecuencia} minuto(s)</b>.
        </p>

        {/* TABLA DEL HISTORIAL */}
        {loading ? (
          <p className="text-center text-muted">Cargando...</p>
        ) : (
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Humedad</th>
                <th>Temperatura</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                  <td>{item.humedad}%</td>
                  <td>{item.temperatura}°C</td>
                  <td>{item.tipoSensor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {history.length === 0 && !loading && (
          <p className="text-center text-muted mt-3">No hay datos recientes.</p>
        )}
      </div>
    </div>
  );
};

export default Historial;
