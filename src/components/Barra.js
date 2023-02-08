import React from "react";

import logo from "../images/TuLoPidesLogo.png";

function Barra() {
  return (
    <nav className="navbar navbar-expand-sm bg-danger navbar-danger">
      <div className="container-fluid justify-content-center">
        <span className="navbar-brand">
          <img src={logo} alt="logo tu lo pides" width="180" height="48" />
        </span>
      </div>
    </nav>
  );
}

export default Barra;
