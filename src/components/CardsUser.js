import React from "react";
import { Link } from "react-router-dom";

import menu from "../images/menu.png";
import promociones from "../images/promociones.png";
import pedidos from "../images/pedidos.png";
import carrito from "../images/carrito.png";

function CardsUser() {
  return (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
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

      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card">
          <img src={promociones} className="card-img-top" alt="promociones" />
          <div className="card-body">
            <h5 className="card-title">PROMOCIONES</h5>
            <p className="card-text">
              Encuentra aquí nuestras ofertas especiales.
            </p>
            <Link className="btn btn-danger rounded-pill" to="/promociones">
              Ir a Promociones
            </Link>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
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

      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
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
    </div>
  );
}

export default CardsUser;
