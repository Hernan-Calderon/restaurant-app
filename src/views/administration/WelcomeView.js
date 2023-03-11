import React from "react";
import { Link } from "react-router-dom";

import productos from "../../images/productos.png";
import valoraciones from "../../images/valoraciones.png";

function WelcomeView({ user }) {
  return (
    <div className="container">
      <h1>Administración Restaurante</h1>
      <p>Bienvenid@ {user.email}</p>
      <div className="row">
        <div className="col-md-2 col-xl-3 mb-3"></div>
        <div className="col-12 col-md-4 col-xl-3 mb-3">
          <div className="card">
            <img src={productos} className="card-img-top" alt="productos" />
            <div className="card-body">
              <h5 className="card-title">PRODUCTOS</h5>
              <p className="card-text">
                Crea, actualiza, consulta y elimina los productos del
                restaurante.
              </p>
              <Link className="btn btn-danger" to="/productos">
                Ir a Productos
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 col-xl-3 mb-3">
          <div className="card">
            <img
              src={valoraciones}
              className="card-img-top"
              alt="valoraciones"
            />
            <div className="card-body">
              <h5 className="card-title">VALORACIONES</h5>
              <p className="card-text">
                Consulta las valoraciones dadas por los clientes sobre el
                servicio.
              </p>
              <Link className="btn btn-danger" to="/valoraciones">
                Ir a Valoraciones
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-xl-3 mb-3"></div>
      </div>
    </div>
  );
}

export default WelcomeView;
