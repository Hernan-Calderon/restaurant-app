import { BrowserRouter, Route, Routes, NavLink, Link } from "react-router-dom";

import "../../styles/global.css";

import firebaseApp from "../../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";

import WelcomeView from "./WelcomeView";
import ProductsView from "./ProductsView";
import RatingsView from "./RatingsView";
import InventoryView from "./InventoryView";
import InventoryEntryView from "./InventoryEntryView";
import InventoryOutputView from "./InventoryOutputView";
import IngredientsView from "./IngredientsView";

import Titulo from "../../components/Titulo";

import logo from "../../images/TuLoPidesLogo.png";
import logo_1 from "../../images/logo_1.png";
import logoRestaurante from "../../images/logo_restaurante.png";

const auth = getAuth(firebaseApp);

function AdminView({ user }) {
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
                <li className="nav-item">
                  <NavLink className="nav-link" to="inicio">
                    Inicio
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="productos">
                    Productos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="ingredientes">
                    Ingredientes
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="valoraciones">
                    Valoraciones
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="inventario">
                    Inventario
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="entradas">
                    Entradas
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="salidas">
                    Salidas
                  </NavLink>
                </li>
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
      <br></br>
      <Routes>
        <Route path="/" element={<WelcomeView user={user} />} />
        <Route path="inicio" element={<WelcomeView user={user} />} />
        <Route path="productos" element={<ProductsView user={user} />} />
        <Route path="valoraciones" element={<RatingsView user={user} />} />
        <Route path="inventario" element={<InventoryView />} />
        <Route path="entradas" element={<InventoryEntryView />} />
        <Route path="salidas" element={<InventoryOutputView />} />
        <Route path="ingredientes" element={<IngredientsView />} />
      </Routes>

      <footer className="bg-danger text-white">
        <div className="container d-flex justify-content-center pt-4">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-3 mb-4">
              <img src={logo_1} className="img-fluid" alt="Logo restaurante" />
            </div>
            <div className="col-12 col-sm-6 col-lg-3"></div>
            <div className="col-12 col-sm-6 col-lg-3 mb-4">
              <p className="h5">Secciones</p>
              <br></br>
              <p className="mb-0">
                <Link className="nav-link" to="inicio">
                  Inicio
                </Link>
              </p>
              <p className="mb-0">
                <Link className="nav-link" to="productos">
                  Productos
                </Link>
              </p>
              <p className="mb-0">
                <Link className="nav-link" to="ingredientes">
                  Ingredientes
                </Link>
              </p>
              <p className="mb-0">
                <Link className="nav-link" to="valoraciones">
                  Valoraciones
                </Link>
              </p>
              <p className="mb-0">
                <Link className="nav-link" to="inventario">
                  Inventario
                </Link>
              </p>
              <p className="mb-0">
                <Link className="nav-link" to="entradas">
                  Entradas
                </Link>
              </p>
              <p className="mb-0">
                <Link className="nav-link" to="salidas">
                  Salidas
                </Link>
              </p>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 mb-4">
              <p className="h5">Contacto</p>
              <br></br>
              <p className="mb-0">Mall de Comidas</p>
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

export default AdminView;
