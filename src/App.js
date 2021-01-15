import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  let citasIni = JSON.parse(localStorage.getItem("citas"));
  if (!citasIni) {
    citasIni = [];
  }

  const [citas, setCitas] = useState(citasIni);

  useEffect(() => {
    if (citasIni) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  const crearCita = (cita) => {
    setCitas([...citas, cita]);
  };

  const eliminarCita = (id) => {
    let newcitas = citas.filter((cita) => cita.id !== id);
    setCitas(newcitas);
  };

  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus Citas";

  return (
    <>
      <h2>Administrador de Pacientes </h2>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
