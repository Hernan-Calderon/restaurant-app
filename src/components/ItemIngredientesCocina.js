import React, { useState, useEffect } from "react";

import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import ItemIngredienteCocina from "./ItemIngredienteCocina";

function ItemIngredientesCocina({ identificador, nombre_producto }) {
  const db = getFirestore(firebaseApp);

  const [ingredientes, setIngredientes] = useState([]);

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
  }, [db, identificador]);

  const listaIngredientes = [];

  ingredientes.forEach((ingrediente) => {
    listaIngredientes.push(
      <ItemIngredienteCocina
        key={ingrediente.id_ingrediente}
        identificador={ingrediente.id_ingrediente}
        cantidad={ingrediente.cantidad}
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
                        <th scope="col">Unidades</th>
                      </tr>
                    </thead>
                    <tbody>{listaIngredientes}</tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
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

export default ItemIngredientesCocina;
