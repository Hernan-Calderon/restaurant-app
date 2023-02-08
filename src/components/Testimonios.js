import React from "react";

import cliente1 from "../images/cliente1.jpg";
import cliente2 from "../images/cliente2.jpg";

function Testimonios() {
  return (
    <div className="row" style={{ background: "#FEEFEC" }}>
      <h2>Nuestros Clientes</h2>

      <div className="col-12 col-lg-6">
        <div className="card mb-4">
          <div className="row g-0">
            <div className="col-4">
              <img
                src={cliente1}
                className="img-fluid rounded-start"
                alt="cliente 1"
              />
            </div>
            <div className="col-8">
              <div className="card-body">
                <h5 className="card-title">Camila Hurtado</h5>
                <p className="card-text">
                  “Ya no tengo que esperar a que me atiendan. Desde la comodidad
                  de la mesa uso la aplicación.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="card mb-4">
          <div className="row g-0">
            <div className="col-4">
              <img
                src={cliente2}
                className="img-fluid rounded-start"
                alt="cliente 1"
              />
            </div>
            <div className="col-8">
              <div className="card-body">
                <h5 className="card-title">Juan Pérez</h5>
                <p className="card-text">
                  “En menos tiempo recibo el aviso de que mi plato está listo.
                  Es una maravilla”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonios;
