import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Link } from "react-router-dom";

import "../../styles/global.css";

import firebaseApp from "../../firebase/credenciales";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

import WelcomeView from "./WelcomeView";

import Titulo from "../../components/Titulo";

import logo from "../../images/TuLoPidesLogo.png";
import logo_1 from "../../images/logo_1.png";
import logoRestaurante from "../../images/logo_restaurante.png";

const auth = getAuth(firebaseApp);

function CodeView({ user }) {
  const db = getFirestore(firebaseApp);
  const [codigo, setCodigo] = useState(0);

  useEffect(() => {
    async function getDocumentos() {
      const docRef = doc(db, "codigo/codigo");
      try {
        const docSnap = await getDoc(docRef);
        setCodigo(docSnap.data()["codigo"]);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDocumentos();
  }, [db]);

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="https://tulopides-mall.netlify.app/"
          >
            <img src={logo} alt="logo tu lo pides" width="180" height="48" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-danger"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Restaurante 1
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item m-1">
                  <NavLink
                    className="btn btn-sm sesion"
                    to="inicio"
                    onClick={() => signOut(auth)}
                  >
                    Cerrar Sesión
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <br></br>
      <Link to="inicio">
        <Titulo imagenTitulo={logoRestaurante} />
      </Link>

      {codigo !== 0 ? <WelcomeView code={codigo} /> : <></>}

      <br></br>

      <footer className="bg-danger text-white">
        <div className="container d-flex justify-content-center pt-4">
          <div className="row">
            <div className="col-sm-6 ">
              <img src={logo_1} className="img-fluid" alt="Logo restaurante" />
            </div>

            <div className="col-sm-6 ">
              <p className="h5">Contacto</p>
              <br></br>
              <p className="mb-0">Mall de comidas</p>
              <p className="mb-0">Local: 301</p>
              <p className="mb-0">Teléfono: 789456123</p>
            </div>
          </div>
        </div>

        <div className="text-center p-3" style={{ backgroundColor: "#491632" }}>
          © 2023 Copyright:
          <span>TuLoPides</span>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default CodeView;
