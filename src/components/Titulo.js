import React from "react";

function Titulo({ imagenTitulo }) {
  return (
    <div className="row">
      <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
      <div className="col-10 col-sm-8 col-md-6 col-lg-4">
        <img src={imagenTitulo} className="img-fluid" alt="imagen" />
      </div>
      <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
    </div>
  );
}

export default Titulo;
