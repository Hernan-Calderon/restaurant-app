import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

import firebaseApp from "../firebase/credenciales";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = "#FFFFFF";

function GraficoValoraciones({ fechaBase }) {
  const valoraciones = require("../assets/valoraciones.json");
  const [pedidosValorados, setPedidosValorados] = useState([]);

  useEffect(() => {
    const db = getFirestore(firebaseApp);

    async function getPedidos() {
      let consulta = query(
        collection(db, "pedidos"),
        where("valoracion", "in", ["1", "2", "3", "4", "5"]),
        where("fecha", ">=", Timestamp.fromDate(fechaBase()))
      );
      try {
        let querySnapshot = await getDocs(consulta);
        setPedidosValorados(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    }
    getPedidos();
  }, [fechaBase]);

  const listaDatos = [0, 0, 0, 0, 0];

  pedidosValorados.forEach((doc) => {
    const valor = parseInt(doc.data()["valoracion"]);
    listaDatos[5 - valor]++;
  });

  const datos = {
    labels: valoraciones.map((valor) => valor.titulo),
    datasets: [
      {
        label: "Pedidos",
        data: listaDatos,
        borderColor: valoraciones.map((valor) => valor.color),
        backgroundColor: valoraciones.map((valor) => valor.color + "50"),
      },
    ],
  };
  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <figure>
      <div style={{ width: "100%", height: "400px", background: "#3C3747" }}>
        <Doughnut data={datos} options={opciones} />
      </div>
    </figure>
  );
}

export default GraficoValoraciones;
