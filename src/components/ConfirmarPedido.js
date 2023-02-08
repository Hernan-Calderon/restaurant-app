import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/RestauranteCartContext";
import Titulo from "./Titulo";

import triste from "../images/triste.png";

import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function ConfirmarPedido({ user }) {
  const db = getFirestore(firebaseApp);

  const { cart, precioTotal, cleanCart } = useCartContext();

  const [redireccionar, setRedireccionar] = useState(false);

  function showTime() {
    const myDate = new Date();
    const hours = myDate.getHours();
    const minutes = myDate.getMinutes();
    const seconds = myDate.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
  }

  const pedido = {
    id_usuario: user.uid,
    fecha: new Date().toLocaleDateString(),
    hora: showTime(),
    estado: "Preparando",
    items: cart.map((product) => ({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: product.cantidad,
    })),
    total: precioTotal(),
  };

  async function submitHandler(evento) {
    evento.preventDefault();
    const codigo = evento.target.elements.confirmar.value;
    if (parseInt(codigo) === 1234) {
      const coleccion = collection(db, "pedidos");
      try {
        await addDoc(coleccion, pedido);
        alert("¡Se realizó el pedido con éxito!");
        cleanCart();
        setRedireccionar(true);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("¡Código inválido!");
    }
  }

  if (redireccionar) {
    return (
      <div className="container">
        <p>¡No hay productos en el carrito!</p>
        <div>
          <Link className="btn btn-danger rounded-pill" to="/">
            Ir al menú
          </Link>
        </div>
        <Titulo imagenTitulo={triste} />
        <br></br>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Confirmar Pedido</h1>
      <div style={{ background: "#FEEFEC" }}>
        <p>Para confirmar el pedido ingrese el código del restaurante.</p>
      </div>

      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="confirmar">Código Restaurante:</label>
          <input
            type="password"
            className="form-control"
            id="confirmar"
            placeholder="Ingrese el código de 4 dígitos"
          />
        </div>

        <br></br>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-danger rounded-pill">
            Aceptar
          </button>
          <Link className="btn btn-danger rounded-pill" to="/carrito">
            Cancelar
          </Link>
        </div>
        <br></br>
      </form>
    </div>
  );
}

export default ConfirmarPedido;
