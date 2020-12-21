import React, { useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import "./App.css";

import ToastAlert from "./ToastAlert";
import Header from "./Header.js";
import TrackerForm from "./TrackerForm";
import Records from "./Records";
import "bootswatch/dist/minty/bootstrap.min.css";
import moment from "moment";

//App
function App() {
  const [logged, setLogged] = useState(false);
  const [show, setShow] = useState(false);
  const [toastText, setToastText] = useState("");
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
    <Container fluid>
      <Row>
        <Col>
          <Header
            usuario={usuario}
            setUsuario={setUsuario}
            logged={logged}
            setLogged={setLogged}
            setShow={setShow}
            setToastText={setToastText}
          />
        </Col>
      </Row>

      {logged ? (
        <Container fluid="md">
          <Row>
            <Col sm={12} md={5}>
              <TrackerForm
                registro={registro}
                setRegistro={setRegistro}
                logged={logged}
                setShow={setShow}
                setToastText={setToastText}
              />
            </Col>
            <Col sm={12} md={7}>
              <Records
                logged={logged}
                usuario={usuario}
                setUsuario={setUsuario}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="login_container">
          <Image fluid src={require("../src/kingdom-sign-in.png")} alt="" />
          <h3>Please Login</h3>
        </Container>
      )}

      <ToastAlert show={show} setShow={setShow} toastText={toastText} />
    </Container>
  );
}

export default App;
