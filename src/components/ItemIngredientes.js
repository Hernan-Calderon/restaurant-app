import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

import ItemIngrediente from "./ItemIngrediente";

function ItemIngredientes({
  identificador,
  nombre_producto,
  descripcion,
  precio,
  tipo,
  url_imagen,
  inventario,
}) {
  const db = getFirestore(firebaseApp);

  const [ingredientes, setIngredientes] = useState([]);
  const [idIngrediente, setIdIngrediente] = useState(inventario[0].id_item);
  const [cantidadIngrediente, setCantiadIngrediente] = useState(0);
  const [actualizar, setActualizar] = useState(false);

  function cleanForm() {
    setIdIngrediente(inventario[0].id_item);
    setCantiadIngrediente(0);
  }

  function generarIngredientes() {
    if (
      ingredientes.find(
        (ingrediente) => ingrediente.id_ingrediente === idIngrediente
      )
    ) {
      return ingredientes.map((ingrediente) => {
        return ingrediente.id_ingrediente === idIngrediente
          ? {
              id_ingrediente: idIngrediente,
              cantidad: cantidadIngrediente,
            }
          : ingrediente;
      });
    }
    return [
      ...ingredientes,
      {
        id_ingrediente: idIngrediente,
        cantidad: cantidadIngrediente,
      },
    ];
  }

  const agregarIngrediente = async (evento) => {
    evento.preventDefault();
    const docRef = doc(db, "productos", identificador);
    try {
      await updateDoc(docRef, {
        nombre_producto: nombre_producto,
        precio: precio,
        descripcion: descripcion,
        tipo: tipo,
        url_imagen: url_imagen,
        ingredientes: generarIngredientes(),
      });
      setCantiadIngrediente(0);
      Swal.fire(
        "Creado",
        "El ingrediente se ha agregado con éxito.",
        "success"
      );
      setActualizar(!actualizar);
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  const eliminarIngrediente = async (idEliminar) => {
    const docRef = doc(db, "productos", identificador);
    try {
      await updateDoc(docRef, {
        nombre_producto: nombre_producto,
        precio: precio,
        descripcion: descripcion,
        tipo: tipo,
        url_imagen: url_imagen,
        ingredientes: ingredientes.filter(
          (ingredient) => ingredient.id_ingrediente !== idEliminar
        ),
      });
      setCantiadIngrediente(0);
      Swal.fire(
        "Eliminado",
        "El ingrediente se ha eliminado con éxito.",
        "success"
      );
      setActualizar(!actualizar);
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  useEffect(() => {
    async function getDocumentos() {
      const docRef = doc(db, "productos", identificador);
      try {
        const docSnap = await getDoc(docRef);
        const items = docSnap.data()["ingredientes"];
        setIngredientes(items);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDocumentos();
  }, [db, identificador, actualizar]);

  const listaIngredientes = [];

  ingredientes.forEach((ingrediente) => {
    listaIngredientes.push(
      <ItemIngrediente
        key={ingrediente.id_ingrediente}
        identificador={ingrediente.id_ingrediente}
        cantidad={ingrediente.cantidad}
        eliminarIngrediente={eliminarIngrediente}
      />
    );
  });

  return (
    <tr style={{ background: "#FEEFEC" }}>
      <td>{nombre_producto}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target={"#gestionar" + identificador}
        >
          Ingredientes
        </button>
        <div
          className="modal fade"
          id={"gestionar" + identificador}
          tabIndex="-1"
          aria-labelledby={"gestionar" + identificador + "Label"}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen-md-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id={"gestionar" + identificador + "Label"}
                >
                  Ingredientes {nombre_producto}
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
                <div className="container">
                  <table className="table table-borderless">
                    <thead>
                      <tr
                        className="text-light"
                        style={{ background: "#491632" }}
                      >
                        <th scope="col">Ingrediente</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>{listaIngredientes}</tbody>
                  </table>
                </div>
                <hr></hr>

                <form onSubmit={agregarIngrediente}>
                  <div className="row">
                    <div className="form-group col-md-8">
                      <label htmlFor="ingrediente" className="form-label">
                        Ingrediente
                      </label>
                      <select
                        className="form-control"
                        id="ingrediente"
                        value={idIngrediente}
                        onChange={(evento) => {
                          setIdIngrediente(evento.target.value);
                        }}
                      >
                        {inventario.map((item) => (
                          <option key={item.id_item} value={item.id_item}>
                            {item.descripcion} {"("}
                            {item.unidades}
                            {")"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="cantidad" className="form-label">
                        Cantidad
                      </label>
                      <input
                        onChange={(evento) => {
                          setCantiadIngrediente(evento.target.value);
                        }}
                        required
                        type={"number"}
                        className="form-control"
                        id="cantidad"
                        placeholder="Cantidad"
                        value={cantidadIngrediente}
                      />
                      <br></br>
                    </div>

                    <div className="d-grid d-sm-flex justify-content-sm-end">
                      <button type="submit" className="btn btn-danger">
                        Agregar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => cleanForm()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default ItemIngredientes;
