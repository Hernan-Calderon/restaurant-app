import { useState } from "react";
import { v4 } from "uuid";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

import firebaseApp from "../firebase/credenciales";
import Detalle from "./Detalle";

function ItemPedido({
  identificador,
  fechaString,
  hora,
  estado,
  items,
  total,
  calificacion,
  observacion,
  user,
}) {
  const db = getFirestore(firebaseApp);
  const [observaciones, setObservaciones] = useState(observacion);
  const [valoracion, setValoracion] = useState(calificacion);

  const id = identificador.replace(/[0123456789]/gi, "a");

  let estilo = "";
  switch (estado) {
    case "Finalizado":
      estilo = "btn btn-primary";
      break;
    case "Listo":
      estilo = "btn btn-success";
      break;
    default:
      estilo = "btn btn-danger";
  }

  function cleanForm() {
    setObservaciones(observacion);
    setValoracion(calificacion);
  }

  const calificar = async (evento) => {
    evento.preventDefault();
    try {
      const docRef = doc(db, "pedidos", identificador);
      await updateDoc(docRef, {
        observaciones: observaciones,
        valoracion: valoracion,
      });
      Swal.fire({
        title: "Actualizado",
        text: "¡Se ha actualizado la valoración del pedido!",
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
                  Pedido: {fechaString} {hora}
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
                <div className="d-grid">
                  <button
                    type="button"
                    className={estilo}
                    data-bs-dismiss="modal"
                  >
                    {estado}
                  </button>
                </div>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target={"#val" + id}
        >
          Valoración
        </button>
        <div
          className="modal fade"
          id={"val" + id}
          tabIndex="-1"
          aria-labelledby={"val" + id + "Label"}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen-md-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={"val" + id + "Label"}>
                  Valoración
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => cleanForm()}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={calificar}>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="valor" className="form-label">
                        Valoración del servicio
                      </label>
                      <select
                        className="form-control"
                        id="valor"
                        value={valoracion}
                        onChange={(evento) => {
                          setValoracion(evento.target.value);
                        }}
                      >
                        <option value="sc">Sin calificar</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="form-group col-md-6 mb-3">
                      <label htmlFor="observaciones" className="form-label">
                        Comentarios
                      </label>
                      <textarea
                        className="form-control"
                        id="observaciones"
                        rows="3"
                        placeholder="Comentarios del servicio"
                        value={observaciones}
                        onChange={(evento) => {
                          setObservaciones(evento.target.value);
                        }}
                      ></textarea>
                    </div>

                    <hr></hr>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={() => cleanForm()}
                      >
                        Close
                      </button>
                      {user && user.rol === "user" ? (
                        <button type="submit" className="btn btn-danger">
                          Actualizar valoración
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default ItemPedido;
