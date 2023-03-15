import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import firebaseApp from "../../firebase/credenciales";

const auth = getAuth(firebaseApp);

function LoginView() {
  const navigate = useNavigate();

  async function submitHandler(evento) {
    evento.preventDefault();
    const email = evento.target.elements.email.value;
    const password = evento.target.elements.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/inicio");
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  }

  return (
    <div className="container">
      <br></br>
      <div className="row">
        <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
        <div className="col-10 col-sm-8 col-md-6 col-lg-4 shadow mb-5">
          <div style={{ background: "#FEEFEC" }}>
            <p>
              Ingresando a la aplicación podrás realizar el pedido de tu comida
              favorita en nuestro restaurante.
            </p>
          </div>
          <br></br>
          <h2>{"Iniciar Sesión"}</h2>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                required
                type="email"
                className="form-control"
                id="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                required
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <br></br>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-danger btn-sm"
                value={"Iniciar Sesión"}
              >
                {"Iniciar Sesión"}
              </button>
              <div></div>
            </div>
          </form>
          <br></br>
          <div className="text-center">
            <p>
              ¿Quieres una cuenta?
              <span
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/registrar")}
              >
                Registrate
              </span>
            </p>
          </div>
        </div>
        <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
      </div>
    </div>
  );
}

export default LoginView;
