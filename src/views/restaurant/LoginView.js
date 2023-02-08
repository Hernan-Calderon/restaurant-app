import React, { useState } from "react";
import firebaseApp from "../../firebase/credenciales";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);

function LoginView() {
  const db = getFirestore(firebaseApp);
  const [estaRegistrando, setEstaRegistrando] = useState(false);
  const navigate = useNavigate();

  async function registrar(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });
    const docuRef = doc(db, `usuarios/${infoUsuario.user.uid}`);
    await setDoc(docuRef, { correo: email, rol: rol });
  }

  async function submitHandler(evento) {
    evento.preventDefault();
    const email = evento.target.elements.email.value;
    const password = evento.target.elements.password.value;
    const rol = "user";

    if (estaRegistrando) {
      try {
        await registrar(email, password, rol);
        navigate("/inicio");
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/inicio");
      } catch (error) {
        alert(error.message);
      }
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
          <h2>{estaRegistrando ? "Registrarse" : "Iniciar Sesión"}</h2>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input type="email" className="form-control" id="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <br></br>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-danger btn-sm"
                value={estaRegistrando ? "Registrarse" : "Iniciar Sesión"}
              >
                {estaRegistrando ? "Registrarse" : "Iniciar Sesión"}
              </button>
              <div></div>
            </div>
          </form>
          <br></br>
          <div className="text-center">
            <p>
              {estaRegistrando
                ? "¿Ya tienes una cuenta? "
                : "¿Quieres una cuenta? "}
              <span
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => setEstaRegistrando(!estaRegistrando)}
              >
                {estaRegistrando ? "Inicia Sesión" : "Registrate"}
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
