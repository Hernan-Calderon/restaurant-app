import React from "react";
import { Link } from "react-router-dom";

import menu from "../images/menu.png";
import pedidos from "../images/pedidos.png";
import carrito from "../images/carrito.png";
import ingresar from "../images/ingresar.png";

function Cards({ user }) {
  return (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-4">
        <div className="card">
          <img src={menu} className="card-img-top" alt="menu" />
          <div className="card-body">
            <h5 className="card-title">MENÚ</h5>
            <p className="card-text">Todos nuestros productos a tu alcance.</p>
            <Link className="btn btn-danger rounded-pill" to="/menu">
              Ir al Menú
            </Link>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4">
        <div className="card">
          <img src={carrito} className="card-img-top" alt="pedidos" />
          <div className="card-body">
            <h5 className="card-title">CARRITO</h5>
            <p className="card-text">
              Todo lo que llevamos en el carrito de compras.
            </p>
            <Link className="btn btn-danger rounded-pill" to="/carrito">
              Ir al Carrito
            </Link>
          </div>
        </div>
      </div>
      {user ? (
        <div className="col-12 col-sm-6 col-md-4">
          <div className="card">
            <img src={pedidos} className="card-img-top" alt="pedidos" />
            <div className="card-body">
              <h5 className="card-title">PEDIDOS</h5>
              <p className="card-text">Para que veas como van tus pedidos.</p>
              <Link className="btn btn-danger rounded-pill" to="/pedidos">
                Ir a Pedidos
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-12 col-sm-6 col-md-4">
          <div className="card">
            <img src={ingresar} className="card-img-top" alt="ingresar" />
            <div className="card-body">
              <h5 className="card-title">Ingresar</h5>
              <p className="card-text">
                Inicia sesión o registrate para realizar tus pedidos.
              </p>
              <Link className="btn btn-danger rounded-pill" to="/ingresar">
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
