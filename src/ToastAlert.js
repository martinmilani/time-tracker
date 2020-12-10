import React from "react";
import "./ToastAlert.css";
import Toast from "react-bootstrap/Toast";
import alertIcon from "./alertIcon.svg";

function ToastAlert({ show, setShow, toastText }) {
  return (
    <div className="toastAlert">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        //autohide
        animation
      >
        <Toast.Header>
          <img src={alertIcon} className="alertIcon" alt="" />
          <strong className="mr-auto">Time-Tracker</strong>
        </Toast.Header>
        <Toast.Body>{toastText}</Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastAlert;
