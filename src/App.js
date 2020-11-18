import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";

import Header from "./Header.js";
import TrackerForm from "./TrackerForm";

import moment from "moment";

//App
function App() {
  const [logged, setLogged] = useState(false);

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const [registro, setRegistro] = useState({
    proyecto: "Proyecto 1",
    horas: "",
    tareas: "",
    fecha: moment().format("DD/MM/YYYY"),
  });

  return (
    <Container fluid="sm">
      <Header
        usuario={usuario}
        setUsuario={setUsuario}
        logged={logged}
        setLogged={setLogged}
      />

      <TrackerForm
        registro={registro}
        setRegistro={setRegistro}
        logged={logged}
      />
    </Container>
  );
}

export default App;
