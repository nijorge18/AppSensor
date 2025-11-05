import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const Calendario: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("08:00");

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    const data = { days: selectedDays, time: selectedTime };
    console.log("Calendario de riego guardado:", data);
    alert("Calendario de riego guardado correctamente ✅");
  };

  const handleReset = () => {
    setSelectedDays([]);
    setSelectedTime("08:00");
  };

  return (
    <div className="calendar-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center mb-3 fw-bold text-primary">Calendario de Riego</h2>
        <p className="text-center text-muted mb-4">
          Configura los días y hora de riego para tus orquídeas 🌱
        </p>

        <h6 className="fw-semibold mb-2">Selecciona los días:</h6>
        <div className="row row-cols-2 g-2 mb-4">
          {daysOfWeek.map((day) => (
            <div className="col" key={day}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={day}
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayToggle(day)}
                />
                <label className="form-check-label small" htmlFor={day}>
                  {day}
                </label>
              </div>
            </div>
          ))}
        </div>

        <h6 className="fw-semibold mb-2">Selecciona la hora:</h6>
        <input
          type="time"
          className="form-control mb-4"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-outline-secondary" onClick={handleReset}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
