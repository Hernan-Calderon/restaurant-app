import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import ItemInventario from "../../components/ItemInventario";

function InventoryView() {
  const db = getFirestore(firebaseApp);
  const listaUnidades = require("../../assets/unidades.json");

  const [descripcion, setdescripcion] = useState("");
  const [unidades, setUnidades] = useState("n/a");
  const [docInventario, setDocInventario] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const itemInventario = {
    descripcion: descripcion,
    unidades: unidades,
    cantidad: 0,
  };

  function cleanForm() {
    setdescripcion("");
    setUnidades("n/a");
  }

  const createItemInventario = async (evento) => {
    evento.preventDefault();
    const coleccion = collection(db, "inventario");
    try {
      await addDoc(coleccion, itemInventario);
      cleanForm();
      Swal.fire("Creado", "El ítem se ha creado con éxito.", "success");
      setActualizar(!actualizar);
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  useEffect(() => {
    async function getDocumentos() {
      const consulta = query(
        collection(db, "inventario"),
        orderBy("descripcion")
      );
      try {
        const querySnapshot = await getDocs(consulta);
        setDocInventario(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDocumentos();
  }, [actualizar, db]);

  const items = [];

  docInventario.forEach((doc) => {
    items.push(
      <ItemInventario
        key={doc.id}
        identificador={doc.id}
        descripcion={doc.data()["descripcion"]}
        unidades={doc.data()["unidades"]}
        cantidad={doc.data()["cantidad"]}
        setActualizar={setActualizar}
        actualizar={actualizar}
      />
    );
  });

  return (
    <div className="container">
      <h1>Inventario</h1>
      <form onSubmit={createItemInventario}>
        <div className="row">
          <div className="form-group col-md-8">
            <br></br>
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <input
              onChange={(evento) => {
                setdescripcion(evento.target.value);
              }}
              required
              type={"text"}
              className="form-control"
              id="descripcion"
              placeholder="Descripción"
              value={descripcion}
            />
          </div>

          <div className="form-group col-md-4">
            <br></br>
            <label htmlFor="unidad" className="form-label">
              Unidades
            </label>
            <select
              className="form-control"
              id="unidad"
              value={unidades}
              onChange={(evento) => {
                setUnidades(evento.target.value);
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

          <div className="d-grid d-sm-flex justify-content-sm-end">
            <button type="submit" className="btn btn-danger">
              Crear nuevo ítem
            </button>
          </div>
        </div>
      </form>
      <hr></hr>
      <br></br>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr className="text-light" style={{ background: "#491632" }}>
              <th scope="col">Descripción</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Unidad</th>
              <th scope="col">Actualizar</th>
              <th scope="col">Entradas</th>
              <th scope="col">Devoluciones</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
      <br></br>
    </div>
  );
}

export default InventoryView;
