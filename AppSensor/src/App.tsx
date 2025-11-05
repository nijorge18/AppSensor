import { useState } from "react";
import SensorCard from "./components/Sensor";
import CalendarModal from "./components/Calendario";

export default function App() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-10">
      {/* Encabezado */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Panel de Riego de Orquídeas
        </h1>
        <p className="text-gray-500 text-sm">
          Monitoreo de humedad y control de calendario de riego
        </p>
      </header>

      {/* Contenedor principal */}
      <main className="w-full max-w-4xl flex flex-col items-center gap-8 px-6">
        {/* Tarjeta del sensor */}
        <SensorCard />

        {/* Botón para abrir el calendario */}
        <button
          onClick={() => setShowCalendar(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition-all"
        >
          Ver calendario de riego
        </button>
      </main>

      {/* Modal del calendario */}
      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}

      {/* Footer simple */}
      <footer className="mt-12 text-gray-400 text-sm">
        © 2025 SensorApp — Proyecto de Riego Inteligente
      </footer>
    </div>
  );
}
