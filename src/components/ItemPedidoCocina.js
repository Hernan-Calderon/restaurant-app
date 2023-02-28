import React from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
import Swal from "sweetalert2";

import firebaseApp from "../firebase/credenciales";
import DetalleCocina from "./DetalleCocina";

function ItemPedidoCocina({
  identificador,
  fechaString,
  hora,
  estado,
  mesa,
  items,
}) {
  const db = getFirestore(firebaseApp);

  let productos = [];

  items.forEach((producto) => {
    productos.push(
      <DetalleCocina
        key={v4()}
        nombre={producto.nombre}
        cantidad={producto.cantidad}
        nota={producto.nota}
      />
    );
  });

  const actualizarPedido = async () => {
    try {
      const docuRef = doc(db, "pedidos/" + identificador);
      await updateDoc(docuRef, { estado: "Listo" });
      Swal.fire("Éxito", "El pedido ha quedado Listo.", "success");
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  return (
    <div className="col-12 col-lg-6">
      <br></br>
      <h3>
        Pedido: {fechaString} {hora} Mesa:{mesa}
      </h3>
      <div className="container">
        <table className="table table-borderless">
          <thead>
            <tr className="text-light" style={{ background: "#491632" }}>
              <th scope="col">Producto</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Anotaciones</th>
            </tr>
          </thead>
          <tbody>{productos}</tbody>
        </table>
        <h5>Estado: {estado}</h5>
        <div className="d-grid">
          <button
            type="button"
            className="btn rounded-pill btn-danger"
            onClick={actualizarPedido}
          >
            Marcar como Listo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemPedidoCocina;
