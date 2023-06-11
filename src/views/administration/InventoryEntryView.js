import React, { useState, useEffect } from "react";

import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";

import ItemEntradaSalida from "../../components/ItemEntradaSalida";

function InventoryEntryView() {
  const db = getFirestore(firebaseApp);

  const [entradas, setEntradas] = useState([]);
  const [periodo, setPeriodo] = useState("actual");

  useEffect(() => {
    async function getDocumentos(fechaInicio, fechaFin) {
      const consulta = query(
        collection(db, "entradas"),
        where("fecha", ">=", fechaInicio),
        where("fecha", "<", fechaFin),
        orderBy("fecha", "desc")
      );
      try {
        const querySnapshot = await getDocs(consulta);
        setEntradas(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    }

    const hoy = new Date();

    if (periodo === "actual") {
      let fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      let fechaFin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);
      getDocumentos(
        Timestamp.fromDate(fechaInicio),
        Timestamp.fromDate(fechaFin)
      );
    } else {
      let fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
      let fechaFin = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      getDocumentos(
        Timestamp.fromDate(fechaInicio),
        Timestamp.fromDate(fechaFin)
      );
    }
  }, [db, periodo]);

  const items = [];

  entradas.forEach((doc) => {
    items.push(
      <ItemEntradaSalida
        key={doc.id}
        item_id={doc.data()["item_id"]}
        presentacion={doc.data()["presentacion"]}
        cantidad={doc.data()["cantidad"]}
        fecha={doc.data()["fecha_string"]}
        hora={doc.data()["hora"]}
        comentarios={doc.data()["comentarios"]}
      />
    );
  });
  return (
    <div className="container">
      <h1>Entradas</h1>

      <div className="row">
        <label htmlFor="periodo" className="form-label">
          Periodo
        </label>
        <select
          className="form-select"
          id="periodo"
          value={periodo}
          onChange={(evento) => {
            setPeriodo(evento.target.value);
          }}
        >
          <option key="1" value="actual">
            Mes actual
          </option>
          <option key="2" value="pasado">
            Mes pasado
          </option>
        </select>
      </div>

      <br></br>

      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr className="text-light" style={{ background: "#491632" }}>
              <th scope="col">Descripción</th>
              <th scope="col">Presentación</th>
              <th scope="col">Unidades</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Comentarios</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryEntryView;
