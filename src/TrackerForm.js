import React from "react";
import "./TrackerForm.css";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "tempusdominus-bootstrap/build/css/tempusdominus-bootstrap.css";
import { DatePicker } from "react-tempusdominus-bootstrap";
import moment from "moment";

import { db, auth } from "./firebase";

function TrackerForm({ registro, setRegistro, setShow, setToastText }) {
  const handleChange = (event) => {
    const campo = event.target.name;
    setRegistro({ ...registro, [campo]: event.target.value });
  };

  const handleCalendar = (event) => {
    setRegistro({
      ...registro,
      fecha: event.date.format("DD/MM/YYYY"),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(registro);

    let user = auth.currentUser;
    let uid = user.uid;

    const itemsRef = db().ref("users").child(uid).child(registro.proyecto);
    const item = {
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
      fecha: moment().format("DD/MM/YYYY"),
    });

    setShow(true);
    setToastText("New Record added");
  };

  return (
    <div className="trackerForm">
      <div className="trackerForm_container">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <label>Date</label>
            <DatePicker
              className="calendario"
              onChange={handleCalendar}
              date={registro.fecha}
              format="DD/MM/YYYY"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Project</Form.Label>
            <Form.Control
              as="select"
              name="proyecto"
              id="proyecto"
              value={registro.proyecto}
              onChange={handleChange}
              custom
              required
            >
              <option value="Proyecto 1">Proyecto 1</option>
              <option value="Proyecto 2">Proyecto 2</option>
              <option value="Proyecto 3">Proyecto 3</option>
              <option value="Proyecto 4">Proyecto 4</option>
              <option value="Proyecto 5">Proyecto 5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Time</Form.Label>
            <Form.Control
              name="horas"
              type="time"
              value={registro.horas}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Tasks</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="tareas"
              value={registro.tareas}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            value="Submit"
            className="buttonSubmit"
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default TrackerForm;
