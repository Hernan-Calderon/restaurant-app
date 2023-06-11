import React from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
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

  function avisoActualizacion() {
    Swal.fire({
      title: "¿El pedido de la mesa " + mesa + " está listo?",
      text: "¡No podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, Está listo!",
    }).then((result) => {
      if (result.isConfirmed) {
        marcarListo();
      }
    });
  }

  const marcarListo = async () => {
    try {
      const docuRef = doc(db, "pedidos/" + identificador);
      await updateDoc(docuRef, { estado: "Listo" });

      for (let i = 0; i < items.length; i++) {
        let producto = items[i];
        for (let ingrediente of producto.ingredientes) {
          let docr = doc(db, "inventario/" + ingrediente.id_ingrediente);
          let docSnap = await getDoc(docr);
          let cantidad = docSnap.data()["cantidad"];
          await updateDoc(docr, {
            cantidad:
              cantidad - producto.cantidad * parseInt(ingrediente.cantidad),
          });
        }
      }

      Swal.fire("Listo", "El pedido ha quedado Listo.", "success");
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
            onClick={avisoActualizacion}
          >
            Marcar como Listo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemPedidoCocina;
