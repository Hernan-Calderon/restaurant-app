import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";

import firebaseApp from "../firebase/credenciales";
import { useCartContext } from "../context/RestauranteCartContext";
import ItemCart from "./ItemCart";

function ConfirmarPedido({ user }) {
  const db = getFirestore(firebaseApp);

  const { cart, precioTotal, cleanCart } = useCartContext();
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [mesa, setMesa] = useState("1");
  const [propina, setPropina] = useState(0);
  const hoy = new Date();

  function showTime() {
    const hours = hoy.getHours();
    const minutes = hoy.getMinutes();
    const seconds = hoy.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
  }

  function cleanForm() {
    setCodigo("");
    setMesa("1");
    setPropina(0);
  }

  const pedido = {
    id_usuario: user.uid,
    fecha_string: hoy.toLocaleDateString(),
    fecha: Timestamp.fromDate(hoy),
    hora: showTime(),
    estado: "Preparando",
    mesa: mesa,
    observaciones: "",
    valoracion: "sc",
    items: cart.map((product) => ({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      ingredientes: product.ingredientes,
      cantidad: product.cantidad,
      nota: product.nota,
    })),
    total: precioTotal() + parseFloat(propina),
    pago_electronico: false,
    pago_efectivo: false,
    propina: parseFloat(propina),
  };

  async function submitHandler(evento) {
    evento.preventDefault();
    const docRef = doc(db, "codigo/codigo");
    const coleccion = collection(db, "pedidos");
    try {
      const docSnap = await getDoc(docRef);
      if (codigo === docSnap.data()["codigo"].toString()) {
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
      } else {
        Swal.fire("Advertencia", "¡Código inválido!", "warning");
      }
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
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

      <br></br>
      <table className="table table-borderless">
        <thead>
          <tr className="text-light" style={{ background: "#491632" }}>
            <th scope="col">Producto</th>
            <th scope="col">Precio Unidad</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Anotaciones</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <ItemCart key={product.id} producto={product} />
          ))}
        </tbody>
      </table>
      <h5>Total: $ {precioTotal()}</h5>

      <div style={{ background: "#FEEFEC" }}>
        <h4>
          Para confirmar el pedido ingrese el código del restaurante y el número
          de la mesa.
        </h4>
      </div>

      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="form-group col-md-4 mb-3">
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

          <div className="form-group col-md-4 mb-3">
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

          <div className="form-group col-md-4 mb-3">
            <label htmlFor="propina" className="form-label">
              Propina
            </label>
            <select
              className="form-control"
              id="propina"
              value={propina}
              onChange={(evento) => {
                setPropina(evento.target.value);
              }}
            >
              <option key={0} value={0}>
                0%
              </option>
              <option key={1} value={precioTotal() * 0.1}>
                10%
              </option>
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
