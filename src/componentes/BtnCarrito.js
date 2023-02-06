import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/RestauranteCartContext";

function BtnCarrito() {
  const { cantidadTotal } = useCartContext();
  return (
    <div className="d-flex justify-content-end sticky-top">
      <Link className="btn btn-danger btn-lg shadow rounded-pill" to="/carrito">
        <i className="bi bi-cart4"></i>
        <span className="badge text-bg-light rounded-circle">
          {cantidadTotal() || ""}
        </span>
      </Link>
    </div>
  );
}

export default BtnCarrito;
