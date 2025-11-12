import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendario: React.FC = () => {
  const [value, setValue] = useState<Value>(new Date());
  const [selectedTime, setSelectedTime] = useState("08:00");

  const handleSave = () => {
    const selectedDate = Array.isArray(value)
      ? value.map((v) => v?.toLocaleDateString()).join(" - ")
      : value?.toLocaleDateString();

    const data = {
      fecha: selectedDate,
      hora: selectedTime,
    };

    console.log("Calendario de riego guardado:", data);
    alert(
      `✅ Calendario guardado:\n📅 Fecha: ${selectedDate}\n⏰ Hora: ${selectedTime}`
    );
  };

  const handleReset = () => {
    setValue(new Date());
    setSelectedTime("08:00");
  };

  return (
    <div className="card shadow-sm w-100 h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title text-success text-center mb-3">
            🌿 Calendario de Riego
          </h5>
          <p className="text-muted text-center small">
            Selecciona el día y la hora de riego para tus orquídeas.
          </p>
        </div>

        {/* Calendario */}
        <div className="d-flex justify-content-center mb-3">
          <Calendar onChange={setValue} value={value} />
        </div>

        {/* Selección de hora */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Seleccionar hora:</label>
          <input
            type="time"
            className="form-control"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        {/* Muestra de selección */}
        <div className="text-center mb-3">
          <p className="text-muted small mb-1">
            📅 Día seleccionado:{" "}
            <strong>
              {Array.isArray(value)
                ? value.map((v) => v?.toLocaleDateString()).join(" - ")
                : value?.toLocaleDateString()}
            </strong>
          </p>
          <p className="text-muted small">
            ⏰ Hora seleccionada: <strong>{selectedTime}</strong>
          </p>
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-outline-secondary" onClick={handleReset}>
            Cerrar
          </button>
          <button className="btn btn-success" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
