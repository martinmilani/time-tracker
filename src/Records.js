import React, { useState } from "react";
import { Button, Container, Fade } from "react-bootstrap";
import "./Records.css";
import Items from "./Items.js";

function Logs({ logged, usuario, setUsuario }) {
  const [open, setOpen] = useState(false);

  return (
    <Container className="logs">
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-fade-text"
        aria-expanded={open}
        disabled={!logged}
      >
        {open ? "Hide records" : "Show records"}
      </Button>

      <Container>
        <Fade in={open}>
          <div>
            <Items usuario={usuario} setUsuario={setUsuario} open={open} />
          </div>
        </Fade>
      </Container>
    </Container>
  );
}

export default Logs;
