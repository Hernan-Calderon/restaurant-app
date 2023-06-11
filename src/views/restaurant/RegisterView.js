import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import firebaseApp from "../../firebase/credenciales";
import Titulo from "../../components/Titulo";
import feliz from "../../images/feliz.png";

const auth = getAuth(firebaseApp);

function RegisterView({ user }) {
  const db = getFirestore(firebaseApp);
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
    //const rol = "mesero";
    //const rol = "cajero";
    //const rol = "codigo";
    //const rol = "admin";
    //const rol = "cocina";
    const rol = "cliente";
    try {
      await registrar(email, password, rol);
      navigate("/inicio");
      Swal.fire(
        "Registrado",
        "¡El usuario ha sido registrado con éxito!",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  }

  return (
    <div className="container">
      <br></br>
      {user ? (
        <div>
          <h2>Usuario Registrado</h2>
          <Titulo imagenTitulo={feliz} />
          <br></br>
        </div>
      ) : (
        <div className="row">
          <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
          <div className="col-10 col-sm-8 col-md-6 col-lg-4 shadow mb-5">
            <div style={{ background: "#FEEFEC" }}>
              <p>
                Ingresando a la aplicación podrás realizar el pedido de tu
                comida favorita en nuestro restaurante.
              </p>
            </div>
            <br></br>
            <h2>{"Registrarse"}</h2>

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
                  value={"Registrarse"}
                >
                  {"Registrarse"}
                </button>
                <div></div>
              </div>
            </form>
            <br></br>
            <div className="text-center">
              <p>
                ¿Ya tienes una cuenta?
                <span
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/ingresar")}
                >
                  Inicia Sesión
                </span>
              </p>
            </div>
          </div>
          <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
        </div>
      )}
    </div>
  );
}

export default RegisterView;
