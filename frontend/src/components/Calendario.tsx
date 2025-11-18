import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { calendarioService } from "../services/CalendarioService";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const diasSemana = [
  "Domingo", "Lunes", "Martes", "Miercoles",
  "Jueves", "Viernes", "Sabado"
];

const Calendario: React.FC = () => {
  const [value, setValue] = useState<Value>(new Date());
  const [selectedTime, setSelectedTime] = useState("08:00");

  const handleSave = async () => {
    if (!value) return;

    const fechas = Array.isArray(value) ? value : [value];

   
    const days = fechas.map((f) => diasSemana[f!.getDay()]);

    const payload = {
      days,
      time: selectedTime
    };

    try {
      const response = await calendarioService.guardarCalendario(payload);

      alert(
        `📅 Calendario guardado:\n` +
        `Días: ${days.join(", ")}\n` +
        `Hora: ${selectedTime}`
      );

      console.log("Guardado correctamente:", response);
    } catch (err) {
      alert(" Error al guardar");
      console.error(err);
    }
  };

  const handleReset = () => {
    setValue(new Date());
    setSelectedTime("08:00");
  };

  return (
    <div className="card shadow-sm w-100 h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        
        <div>
          <h5 className="mb-3">Seleccionar día(s)</h5>
          <Calendar onChange={setValue} value={value} selectRange={true} />

          <h5 className="mt-3">Seleccionar hora</h5>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="form-control w-50"
          />
        </div>

        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-primary" onClick={handleSave}>
            Guardar
          </button>

          <button className="btn btn-secondary" onClick={handleReset}>
            Resetear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
