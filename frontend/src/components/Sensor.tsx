import { useState, useEffect } from "react";

export default function Sensor() {
  const [humidity, setHumidity] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    // Simulación temporal (más adelante se conectará al backend Flask)
    const randomHumidity = Math.floor(60 + Math.random() * 30);
    const randomTemp = Math.floor(18 + Math.random() * 10);
    setHumidity(randomHumidity);
    setTemperature(randomTemp);
  }, []);

  return (
    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow text-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Datos del Sensor
      </h2>

      <div className="flex justify-around text-gray-800">
        <div>
          <p className="text-sm text-gray-500">Humedad</p>
          <p className="text-3xl font-bold text-blue-600">
            {humidity !== null ? `${humidity}%` : "—"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Temperatura</p>
          <p className="text-3xl font-bold text-orange-500">
            {temperature !== null ? `${temperature}°C` : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
