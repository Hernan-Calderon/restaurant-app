import React from "react";
import { Link } from "react-router-dom";

import productos from "../../images/productos.png";
import ingredientes from "../../images/ingredientes.png";
import valoraciones from "../../images/valoraciones.png";
import inventario from "../../images/inventario.png";
import entradas from "../../images/entradas.png";
import salidas from "../../images/salidas.png";

function WelcomeView({ user }) {
  return (
    <div className="container">
      <h1>Administración Restaurante</h1>
      <p>Bienvenid@ {user.email}</p>
      <div className="row">
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
              src={ingredientes}
              className="card-img-top"
              alt="ingredientes"
            />
            <div className="card-body">
              <h5 className="card-title">INGREDIENTES</h5>
              <p className="card-text">
                Crea, actualiza, consulta y elimina los ingredientes de los
                productos del restaurante.
              </p>
              <Link className="btn btn-danger" to="/ingredientes">
                Ir a Ingredientes
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

        <div className="col-12 col-md-4 col-xl-3 mb-3">
          <div className="card">
            <img src={inventario} className="card-img-top" alt="inventario" />
            <div className="card-body">
              <h5 className="card-title">INVENTARIO</h5>
              <p className="card-text">
                Consulta el inventario del restaurante. Realiza entradas y
                salidas al inventario.
              </p>
              <Link className="btn btn-danger" to="/inventario">
                Ir a Inventario
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 col-xl-3 mb-3">
          <div className="card">
            <img src={entradas} className="card-img-top" alt="entradas" />
            <div className="card-body">
              <h5 className="card-title">ENTRADAS</h5>
              <p className="card-text">
                Consulta todas las entradas realizadas en el inventario del
                restaurante.
              </p>
              <Link className="btn btn-danger" to="/entradas">
                Ir a Entradas
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 col-xl-3 mb-3">
          <div className="card">
            <img src={salidas} className="card-img-top" alt="salidas" />
            <div className="card-body">
              <h5 className="card-title">SALIDAS</h5>
              <p className="card-text">
                Consulta todas las salidas realizadas en el inventario del
                restaurante.
              </p>
              <Link className="btn btn-danger" to="/salidas">
                Ir a Salidas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeView;
