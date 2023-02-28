import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

import firebaseApp from "../../firebase/credenciales";
import BtnMenu from "../../components/BtnMenu";
import ItemPedido from "../../components/ItemPedido";
import GraficoValoraciones from "../../components/GraficoValoraciones";

function RatingsView({ user }) {
  const valoraciones = require("../../assets/valoraciones.json");

  const [pedidos, setPedidos] = useState([]);
  const [tipoValor, setTipoValor] = useState("5");

  const fechaBase = () => {
    let hoy = new Date();
    let treintaDias = 1000 * 60 * 60 * 24 * 30;
    let resta = hoy.getTime() - treintaDias;
    return new Date(resta);
  };

  useEffect(() => {
    const db = getFirestore(firebaseApp);

    async function getPedidos() {
      let consulta = query(
        collection(db, "pedidos"),
        where("valoracion", "==", tipoValor),
        where("fecha", ">=", Timestamp.fromDate(fechaBase()))
      );
      try {
        let querySnapshot = await getDocs(consulta);
        setPedidos(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    }
    getPedidos();
  }, [tipoValor]);

  const items = [];

  pedidos.forEach((doc) => {
    items.push(
      <ItemPedido
        key={doc.id}
        identificador={doc.id}
        fechaString={doc.data()["fecha_string"]}
        hora={doc.data()["hora"]}
        estado={doc.data()["estado"]}
        items={doc.data()["items"]}
        total={doc.data()["total"]}
        calificacion={doc.data()["valoracion"]}
        observacion={doc.data()["observaciones"]}
        user={user}
      />
    );
  });

  return (
    <div className="container">
      <h1>Valoración del Servicio</h1>
      <GraficoValoraciones fechaBase={fechaBase}></GraficoValoraciones>
      <hr></hr>
      <div className="btn-group" role="group">
        {valoraciones.map((valoracion) => (
          <BtnMenu
            key={valoracion.id}
            tipo={valoracion.tipo}
            titulo={valoracion.titulo}
            setTipoProducto={setTipoValor}
            valorDefecto={"5"}
          ></BtnMenu>
        ))}
      </div>
      <hr></hr>
      <h4>{"Pedidos con valoración = " + tipoValor}</h4>
      <table className="table table-borderless">
        <thead>
          <tr className="text-light" style={{ background: "#491632" }}>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">Detalle</th>
            <th scope="col">Valoración</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
}

export default RatingsView;
