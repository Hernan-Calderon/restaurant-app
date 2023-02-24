import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useCartContext } from "../context/RestauranteCartContext";
import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function ConfirmarPedido({ user }) {
  const db = getFirestore(firebaseApp);

  const { cart, precioTotal, cleanCart } = useCartContext();
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [mesa, setMesa] = useState("1");

  function showTime() {
    const myDate = new Date();
    const hours = myDate.getHours();
    const minutes = myDate.getMinutes();
    const seconds = myDate.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
  }

  function cleanForm() {
    setCodigo("");
    setMesa("1");
  }

  const pedido = {
    id_usuario: user.uid,
    fecha: new Date().toLocaleDateString(),
    hora: showTime(),
    estado: "Preparando",
    mesa: mesa,
    observaciones: "",
    valoracion: "sc",
    items: cart.map((product) => ({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: product.cantidad,
      nota: product.nota,
    })),
    total: precioTotal(),
  };

  async function submitHandler(evento) {
    evento.preventDefault();
    if (codigo === "1234") {
      const coleccion = collection(db, "pedidos");
      try {
        await addDoc(coleccion, pedido);
        cleanForm();
        Swal.fire({
          title: "Éxito",
          text: "¡Se realizó el pedido con éxito!",
          icon: "success",
          confirmButtonColor: "#491632",
          iconColor: "#dc3545",
        });
        cleanCart();
        navigate("/pedidos");
      } catch (error) {
        Swal.fire("Error", error.message.slice(10), "error");
      }
    } else {
      Swal.fire("Advertencia", "¡Código inválido!", "warning");
    }
  }

  const numMesas = 10;
  let mesas = [];
  for (let i = 1; i <= numMesas; i++) {
    mesas.push(String(i));
  }

  return (
    <div className="container">
      <h1>Confirmar Pedido</h1>
      <div style={{ background: "#FEEFEC" }}>
        <p>
          Para confirmar el pedido ingrese el código del restaurante y el número
          de la mesa.
        </p>
      </div>

      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="confirnmar" className="form-label">
              Código Restaurante:
            </label>
            <input
              required
              type="password"
              className="form-control"
              id="confirmar"
              placeholder="Ingrese el código de 4 dígitos"
              value={codigo}
              onChange={(evento) => {
                setCodigo(evento.target.value);
              }}
            />
          </div>

          <div className="form-group col-md-6 mb-3">
            <label htmlFor="mesa" className="form-label">
              Número de Mesa
            </label>
            <select
              className="form-control"
              id="mesa"
              value={mesa}
              onChange={(evento) => {
                setMesa(evento.target.value);
              }}
            >
              {mesas.map((mesa) => (
                <option key={mesa} value={mesa}>
                  {"Mesa " + mesa}
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
            <button type="submit" className="btn btn-danger rounded-pill">
              Aceptar
            </button>
            <Link
              className="btn btn-danger rounded-pill"
              onClick={() => cleanForm()}
              to="/carrito"
            >
              Cancelar
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ConfirmarPedido;
