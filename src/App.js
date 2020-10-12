import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "tempusdominus-bootstrap/build/css/tempusdominus-bootstrap.css";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { DatePicker } from "react-tempusdominus-bootstrap";

//Firebase Initialize

import firebase from "firebase/app";
import "firebase/database";
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export const config = {
  apiKey: API_KEY,
  authDomain: "time-tracker-9578e.firebaseapp.com",
  databaseURL: "https://time-tracker-9578e.firebaseio.com",
  projectId: "time-tracker-9578e",
  storageBucket: "time-tracker-9578e.appspot.com",
  messagingSenderId: "507541137774",
  appId: "1:507541137774:web:d7da3f8f9561e6a98b797f",
  measurementId: "G-3H30QVNSDH",
};
firebase.initializeApp(config);

//App
function App() {
  const [show, setShow] = useState(false);

  const [registro, setRegistro] = useState({
    proyecto: "",
    horas: "",
    tareas: "",
    fecha: "",
  });

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (event) => {
    const campo = event.target.name;
    setRegistro({ ...registro, [campo]: event.target.value });
  };

  const handleCalendar = (event) => {
    console.log(event.date._d.toString());
    setRegistro({ ...registro, fecha: event.date._d.toString() });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(registro);
    handleShow();

    const itemsRef = firebase.database().ref("registros");
    const item = {
      proyecto: registro.proyecto,
      horas: registro.horas,
      tareas: registro.tareas,
      fecha: registro.fecha,
    };
    itemsRef.push(item);

    setRegistro({
      ...registro,
      proyecto: "Proyecto 1",
      horas: 0,
      tareas: "",
      fecha: null,
    });
  };

  const Alerta = () => {
    return (
      <Alert
        dismissible
        show={show}
        transition
        variant="success"
        onClose={handleClose}
      >
        Un registro a sido guardado
      </Alert>
    );
  };

  return (
    <Container fluid="sm">
      <h1>Time Tracker</h1>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <label>Fecha</label>
              <DatePicker className="calendario" onChange={handleCalendar} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Proyecto</Form.Label>
              <Form.Control
                as="select"
                name="proyecto"
                id="proyecto"
                value={registro.proyecto}
                onChange={handleChange}
                custom
              >
                <option value="Proyecto 1">Proyecto 1</option>
                <option value="Proyecto 2">Proyecto 2</option>
                <option value="Proyecto 3">Proyecto 3</option>
                <option value="Proyecto 4">Proyecto 4</option>
                <option value="Proyecto 5">Proyecto 5</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}></Col>
          <Col sm={4}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Tiempo</Form.Label>
              <Form.Control
                name="horas"
                type="time"
                value={registro.horas}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Tareas</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="tareas"
                value={registro.tareas}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" value="Submit">
          Guardar
        </Button>
      </Form>

      <Alerta />
    </Container>
  );
}

export default App;
