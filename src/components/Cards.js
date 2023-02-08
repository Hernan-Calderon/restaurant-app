import React from "react";
import { Link } from "react-router-dom";

import menu from "../images/menu.png";
import promociones from "../images/promociones.png";

function Cards() {
  return (
    <div className="row">
      <div className="col-md-2 col-lg-3"></div>
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
      <div className="col-md-2 col-lg-3"></div>
    </div>
  );
}

export default Cards;
