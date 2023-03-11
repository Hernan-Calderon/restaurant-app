import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import Swal from "sweetalert2";

import firebaseApp from "../firebase/credenciales";
import { useCartContext } from "../context/RestauranteCartContext";
import Detalle from "./Detalle";
import BtnPaypal from "./BtnPaypal";

function PagoElectronico() {
  const { idPedido } = useCartContext();
  const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
  const navigate = useNavigate();

  const [totalDolares, setTotalDolares] = useState(0);
  const [pedido, setPedido] = useState({});
  const [productos, setProductos] = useState([]);

  const actualizarPagoElectronico = async () => {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "pedidos", idPedido);
    try {
      await updateDoc(docRef, {
        pago_electronico: true,
      });
      Swal.fire({
        title: "Pago Realizado",
        text: "¡El pago se ha realizado de forma exitosa!",
        icon: "success",
        confirmButtonColor: "#491632",
        iconColor: "#dc3545",
      });
      navigate("/pedidos");
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  useEffect(() => {
    const db = getFirestore(firebaseApp);

    async function getPedido() {
      const docRef = doc(db, "pedidos", idPedido);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPedido(docSnap.data());
          const items = docSnap.data().items;
          let lista = [];
          items.forEach((producto) => {
            lista.push(
              <Detalle
                key={v4()}
                nombre={producto.nombre}
                precio={producto.precio}
                cantidad={producto.cantidad}
              />
            );
          });
          setProductos(lista);
          fetch(API_URL)
            .then((response) => response.json())
            .then((json) => {
              const dolares = docSnap.data().total / json.rates.COP;
              setTotalDolares(dolares.toFixed(2));
            });
        } else {
          console.log("No se encontró el documento");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getPedido();
  }, [idPedido]);

  return (
    <div className="container">
      <div className="row">
        <h1 style={{ color: "#491632" }}>Pago Electrónico</h1>
        <br></br>
        <h4>
          Pedido: {pedido.fecha_string} {pedido.hora}
        </h4>
        <table className="table table-borderless">
          <thead>
            <tr className="text-light" style={{ background: "#491632" }}>
              <th scope="col">Producto</th>
              <th scope="col">Precio Unidad</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>{productos}</tbody>
        </table>
        <h5>Total: $ {pedido.total}</h5>
        <h5>Total Pago en Dólares: $ {totalDolares}</h5>
      </div>
      <div className="row">
        <div className="col-md-2 col-xxl-3"></div>
        <div className="col-12 col-md-8 col-xxl-6">
          {totalDolares === 0 ? (
            <></>
          ) : (
            <BtnPaypal
              totalDolares={totalDolares}
              actualizarPago={actualizarPagoElectronico}
            ></BtnPaypal>
          )}
        </div>
        <div className="col-md-2 col-xxl-3"></div>
      </div>
    </div>
  );
}

export default PagoElectronico;
