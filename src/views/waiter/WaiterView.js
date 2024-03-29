import { BrowserRouter, Route, Routes, NavLink, Link } from "react-router-dom";

import "../../styles/global.css";

import firebaseApp from "../../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";

import { useCartContext } from "../../context/RestauranteCartContext";
import WelcomeView from "./WelcomeView";
import MenuView from "./MenuView";
import OrdersView from "./OrdersView";
import CartView from "./CartView";
import ConfirmarPedidoMesero from "../../components/ConfirmarPedidoMesero";

import Titulo from "../../components/Titulo";

import logo from "../../images/TuLoPidesLogo.png";
import logo_1 from "../../images/logo_1.png";
import logoRestaurante from "../../images/logo_restaurante.png";

const auth = getAuth(firebaseApp);

function WaiterView({ user }) {
  const { cleanCart } = useCartContext();

  function cerrarSesion() {
    cleanCart();
    signOut(auth);
  }

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
                    Menú
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="pedidos">
                    Pedidos
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="carrito">
                    Carrito
                  </NavLink>
                </li>

                <li className="nav-item m-1">
                  <NavLink
                    className="btn btn-sm sesion"
                    to="inicio"
                    onClick={() => cerrarSesion()}
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
        <Route path="productos" element={<MenuView user={user} />} />
        <Route path="pedidos" element={<OrdersView user={user} />} />
        <Route path="carrito" element={<CartView />} />
        <Route
          path="confirmar"
          element={<ConfirmarPedidoMesero user={user} />}
        />
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
                  Menú
                </Link>
              </p>
              <p className="mb-0">
                <Link className="nav-link" to="pedidos">
                  Pedidos
                </Link>
              </p>
              <p className="mb-0">
                <Link className="nav-link" to="carrito">
                  Carrito
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

export default WaiterView;
