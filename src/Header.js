import React from "react";
import "./Header.css";
import { Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";
import { auth } from "./firebase";

function Header({
  usuario,
  setUsuario,
  logged,
  setLogged,
  setShow,
  setToastText,
}) {
  const logIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(usuario.email, usuario.password)
      .then((auth1) => {
        setLogged(true);
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then((auth1) => {
        logged = true;
        setShow(true);
        setToastText("New User created");
      })
      .catch((error) => alert(error.message));
  };

  const handleLogout = (e) => {
    auth.signOut();
    setLogged(false);
  };

  return (
    <div className="header">
      <Navbar expand="lg" bg="light">
        <Navbar.Brand href="#home">
          <h2>Time Tracker</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {logged ? (
            <Form inline className="header__form">
              <Nav className="mr-auto">
                <Navbar.Text>Signed in as: {usuario.email}</Navbar.Text>
              </Nav>
              <Button size="sm" onClick={handleLogout} variant="secondary">
                Log Out
              </Button>
            </Form>
          ) : (
            <Form inline className="header__form">
              <FormControl
                size="sm"
                className="navBar__formInput"
                placeholder="Email"
                type="email"
                value={usuario.email}
                onChange={(e) =>
                  setUsuario({ ...usuario, email: e.target.value })
                }
              />
              <FormControl
                size="sm"
                className="navBar__formInput"
                placeholder="Password"
                type="password"
                value={usuario.password}
                onChange={(e) =>
                  setUsuario({ ...usuario, password: e.target.value })
                }
              />
              <Nav className="mr-auto"></Nav>
              <div className="header__buttons">
                <Button
                  className="navBar__button"
                  variant="secondary"
                  type="submit"
                  size="sm"
                  onClick={logIn}
                >
                  Log In
                </Button>

                <Button
                  className="navBar__button"
                  variant="secondary"
                  type="submit"
                  size="sm"
                  onClick={register}
                >
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
      <img src="./alertIcon.svg" alt="" />
    </div>
  );
}

export default Header;
