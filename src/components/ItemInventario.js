import React, { useState } from "react";
import Swal from "sweetalert2";

import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

function ItemInventario({
  identificador,
  descripcion,
  unidades,
  cantidad,
  setActualizar,
  actualizar,
}) {
  const db = getFirestore(firebaseApp);
  const docRef = doc(db, "inventario", identificador);
  const listaUnidades = require("../assets/unidades.json");

  const [presentacion, setPresentacion] = useState(0);
  const [cantidadUnidades, setCantidadUnidades] = useState(0);
  const [comentarios, setComentarios] = useState("");
  const [descripcionItem, setDescripcionItem] = useState(descripcion);
  const [unidadesItem, setUnidadesItem] = useState(unidades);
  const hoy = new Date();

  function showTime() {
    const hours = hoy.getHours();
    const minutes = hoy.getMinutes();
    const seconds = hoy.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
  }

  function cleanFormUpdate() {
    setDescripcionItem(descripcion);
    setUnidadesItem(unidades);
  }

  function cleanForm() {
    setPresentacion(0);
    setCantidadUnidades(0);
    setComentarios("");
  }

  const itemIngreso = {
    fecha_string: hoy.toLocaleDateString(),
    fecha: Timestamp.fromDate(hoy),
    hora: showTime(),
    item_id: identificador,
    presentacion: presentacion,
    cantidad: cantidadUnidades,
    comentarios: comentarios,
  };

  const generarEntrada = async (evento) => {
    evento.preventDefault();
    if (presentacion <= 0 || cantidadUnidades <= 0) {
      Swal.fire(
        "Error",
        "La presentación o la cantidad debe ser mayor a 0",
        "error"
      );
    } else {
      const coleccion = collection(db, "entradas");
      try {
        await updateDoc(docRef, {
          descripcion: descripcionItem,
          unidades: unidadesItem,
          cantidad: cantidad + presentacion * cantidadUnidades,
        });
        await addDoc(coleccion, itemIngreso);
        setActualizar(!actualizar);
        cleanForm();
        Swal.fire("Creado", "La entrada se ha realizado con éxito.", "success");
      } catch (error) {
        Swal.fire("Error", error.message.slice(10), "error");
      }
    }
  };

  const generarSalida = async (evento) => {
    evento.preventDefault();
    if (presentacion <= 0 || cantidadUnidades <= 0) {
      Swal.fire(
        "Error",
        "La presentación o la cantidad debe ser mayor a 0",
        "error"
      );
    } else {
      const coleccion = collection(db, "salidas");
      try {
        await updateDoc(docRef, {
          descripcion: descripcionItem,
          unidades: unidadesItem,
          cantidad: cantidad - presentacion * cantidadUnidades,
        });
        await addDoc(coleccion, itemIngreso);
        setActualizar(!actualizar);
        cleanForm();
        Swal.fire("Creado", "La salida se ha realizado con éxito.", "success");
      } catch (error) {
        Swal.fire("Error", error.message.slice(10), "error");
      }
    }
  };

  const actualizarItem = async (evento) => {
    evento.preventDefault();
    try {
      await updateDoc(docRef, {
        descripcion: descripcionItem,
        unidades: unidadesItem,
        cantidad: cantidad,
      });
      setActualizar(!actualizar);
      Swal.fire(
        "Creado",
        "La actualización se ha realizado con éxito.",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  return (
    <tr style={{ background: "#FEEFEC" }}>
      <td>{descripcion}</td>
      <td>{cantidad}</td>
      <td>{unidades}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target={"#actualizar" + identificador}
        >
          Actualizar
        </button>
        <div
          className="modal fade"
          id={"actualizar" + identificador}
          tabIndex="-1"
          aria-labelledby={"actualizar" + identificador + "Label"}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen-md-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id={"actualizar" + identificador + "Label"}
                >
                  Actualizar
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => cleanFormUpdate()}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={actualizarItem}>
                  <div className="row">
                    <div className="form-group col-md-8">
                      <label htmlFor="descripcion" className="form-label">
                        Descripción
                      </label>
                      <input
                        onChange={(evento) => {
                          setDescripcionItem(evento.target.value);
                        }}
                        required
                        type={"text"}
                        className="form-control"
                        id="descripcion"
                        placeholder="Descripción"
                        value={descripcionItem}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="unidad" className="form-label">
                        Unidades
                      </label>
                      <select
                        className="form-control"
                        id="unidad"
                        value={unidadesItem}
                        onChange={(evento) => {
                          setUnidadesItem(evento.target.value);
                        }}
                      >
                        {listaUnidades.map((unidad) => (
                          <option key={unidad.id} value={unidad.nombre}>
                            {unidad.nombre}
                          </option>
                        ))}
                      </select>
                      <br></br>
                    </div>

                    <hr></hr>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={() => cleanFormUpdate()}
                      >
                        Close
                      </button>

                      <button type="submit" className="btn btn-danger">
                        Actualizar
                      </button>
                    </div>
                  </div>
                </form>
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
          data-bs-target={"#entrada" + identificador}
        >
          Entrada
        </button>
        <div
          className="modal fade"
          id={"entrada" + identificador}
          tabIndex="-1"
          aria-labelledby={"entrada" + identificador + "Label"}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen-md-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id={"entrada" + identificador + "Label"}
                >
                  Entrada {descripcion}
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
                <form onSubmit={generarEntrada}>
                  <div className="row">
                    <div className="form-group col-md-8">
                      <label htmlFor="presentacion" className="form-label">
                        Presentación
                      </label>
                      <div className="input-group">
                        <input
                          onChange={(evento) => {
                            setPresentacion(evento.target.value);
                          }}
                          required
                          type={"number"}
                          className="form-control"
                          id="presentacion"
                          placeholder="Presentación"
                          value={presentacion}
                        />
                        <span className="input-group-text">{unidades}</span>
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="cantidad" className="form-label">
                        Cantidad
                      </label>
                      <input
                        onChange={(evento) => {
                          setCantidadUnidades(evento.target.value);
                        }}
                        required
                        type={"number"}
                        className="form-control"
                        id="cantidad"
                        placeholder="Cantidad"
                        value={cantidadUnidades}
                      />
                    </div>

                    <div className="form-group col-md-12 mb-3">
                      <label htmlFor="comentarios" className="form-label">
                        Comentarios
                      </label>
                      <textarea
                        className="form-control"
                        id="comentarios"
                        rows="3"
                        placeholder="Comentarios del Ingreso"
                        value={comentarios}
                        onChange={(evento) => {
                          setComentarios(evento.target.value);
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

                      <button type="submit" className="btn btn-danger">
                        Realizar entrada
                      </button>
                    </div>
                  </div>
                </form>
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
          data-bs-target={"#salida" + identificador}
        >
          Salida
        </button>
        <div
          className="modal fade"
          id={"salida" + identificador}
          tabIndex="-1"
          aria-labelledby={"salida" + identificador + "Label"}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen-md-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id={"salida" + identificador + "Label"}
                >
                  Salida {descripcion}
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
                <form onSubmit={generarSalida}>
                  <div className="row">
                    <div className="form-group col-md-8">
                      <label htmlFor="presentacion" className="form-label">
                        Presentación
                      </label>
                      <div className="input-group">
                        <input
                          onChange={(evento) => {
                            setPresentacion(evento.target.value);
                          }}
                          required
                          type={"number"}
                          className="form-control"
                          id="presentacion"
                          placeholder="Presentación"
                          value={presentacion}
                        />
                        <span className="input-group-text">{unidades}</span>
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="cantidad" className="form-label">
                        Cantidad
                      </label>
                      <input
                        onChange={(evento) => {
                          setCantidadUnidades(evento.target.value);
                        }}
                        required
                        type={"number"}
                        className="form-control"
                        id="cantidad"
                        placeholder="Cantidad"
                        value={cantidadUnidades}
                      />
                    </div>

                    <div className="form-group col-md-12 mb-3">
                      <label htmlFor="comentarios" className="form-label">
                        Comentarios
                      </label>
                      <textarea
                        className="form-control"
                        id="comentarios"
                        rows="3"
                        placeholder="Comentarios del Ingreso"
                        value={comentarios}
                        onChange={(evento) => {
                          setComentarios(evento.target.value);
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

                      <button type="submit" className="btn btn-danger">
                        Realizar salida
                      </button>
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

export default ItemInventario;
