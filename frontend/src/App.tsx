import React from "react";
import Calendario from "./components/Calendario";
import Sensor from "./components/Sensor";
import HistorialSensor from "./components/HistorialSensor";


function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eafaf1 0%, #d8f3dc 50%, #b7e4c7 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-success" href="#">
            🌱OrchidMonitor
          </a>
          <span className="text-muted small">
            Monitoreo de orquideas y calendario de riego.
          </span>
        </div>
      </nav>

      {}
      <main className="container my-5 flex-grow-1">
        <div className="row g-4">

          <div className="col-12 col-lg-4 d-flex">
            <Calendario />
          </div>

          <div className="col-12 col-lg-4 d-flex">
            <Sensor />
          </div>

          <div className="col-12 col-lg-4 d-flex">
            <HistorialSensor />
          </div>

        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white text-center text-muted py-3 shadow-sm mt-auto">
        <small>
          © {new Date().getFullYear()} OrchidMonitor — Proyecto de Monitoreo de
          Orquídeas 🌱
        </small>
      </footer>
    </div>
  );
}

export default App;
