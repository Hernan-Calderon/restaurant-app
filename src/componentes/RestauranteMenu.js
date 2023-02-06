import React from "react";

import Productos from "./Productos";
import BtnCarrito from "./BtnCarrito";

function RestauranteMenu({ user }) {
  return (
    <div>
      <BtnCarrito />
      <div className="container">
        <Productos />
      </div>
    </div>
  );
}

export default RestauranteMenu;
