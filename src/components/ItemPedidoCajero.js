import { v4 } from "uuid";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

import firebaseApp from "../firebase/credenciales";
import Detalle from "./Detalle";

function ItemPedidoCajero({
  identificador,
  fechaString,
  hora,
  estado,
  mesa,
  items,
  total,
  pagoElectronico,
  pagoEfectivo,
}) {
  const db = getFirestore(firebaseApp);
  const id = identificador.replace(/[0123456789]/gi, "a");

  let estilo = "";
  switch (estado) {
    case "Entregado":
      estilo = "btn btn-primary";
      break;
    case "Listo":
      estilo = "btn btn-success";
      break;
    default:
      estilo = "btn btn-danger";
  }

  function avisoActualizacion() {
    Swal.fire({
      title: "¿El pedido ha sido entregado?",
      text: "¡No podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, Se ha entregado!",
    }).then((result) => {
      if (result.isConfirmed) {
        marcarEntregado();
      }
    });
  }

  const actualizarPagoEfectivo = async () => {
    try {
      const docRef = doc(db, "pedidos", identificador);
      await updateDoc(docRef, {
        pago_efectivo: true,
      });
      Swal.fire({
        title: "Pago Realizado",
        text: "¡Se ha realizado el pago!",
        icon: "success",
        confirmButtonColor: "#491632",
        iconColor: "#dc3545",
      });
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  const marcarEntregado = async () => {
    try {
      const docRef = doc(db, "pedidos", identificador);
      await updateDoc(docRef, {
        estado: "Entregado",
      });
      Swal.fire({
        title: "Entregado",
        text: "¡El pedido ha quedado entregado!",
        icon: "success",
        confirmButtonColor: "#491632",
        iconColor: "#dc3545",
      });
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  const productos = [];

  items.forEach((producto) => {
    productos.push(
      <Detalle
        key={v4()}
        nombre={producto.nombre}
        precio={producto.precio}
        cantidad={producto.cantidad}
      />
    );
  });

  return (
    <tr style={{ background: "#FEEFEC" }}>
      <td>{fechaString}</td>
      <td>{hora}</td>
      <td>
        <button
          type="button"
          className={estilo}
          data-bs-toggle="modal"
          data-bs-target={"#" + id}
        >
          {estado}
        </button>
        <div
          className="modal fade"
          id={id}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen-md-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Pedido: {fechaString} {hora} Mesa:{mesa}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <table className="table table-borderless">
                    <thead>
                      <tr
                        className="text-light"
                        style={{ background: "#491632" }}
                      >
                        <th scope="col">Producto</th>
                        <th scope="col">Precio Unidad</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>{productos}</tbody>
                  </table>
                  <h5>Total: $ {total}</h5>
                </div>
                <hr></hr>

                <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
                  <button
                    type="button"
                    className={estilo}
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  {pagoElectronico === true || pagoEfectivo === true ? (
                    <button disabled type="button" className="btn btn-warning">
                      Pagado
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => actualizarPagoEfectivo()}
                    >
                      Realizar pago
                    </button>
                  )}
                </div>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <h2 style={{ color: "#491632" }}>
          <i className={"bi bi-" + mesa + "-circle"}></i>
        </h2>
      </td>
      <td>
        <button
          disabled={estado !== "Listo"}
          className="btn btn-primary"
          onClick={avisoActualizacion}
        >
          <i className="bi bi-check-circle"></i>
        </button>
      </td>
    </tr>
  );
}

export default ItemPedidoCajero;
