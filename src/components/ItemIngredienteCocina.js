import React, { useState, useEffect } from "react";

import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function ItemIngredienteCocina({ identificador, cantidad }) {
  const db = getFirestore(firebaseApp);
  const [descripcion, setDescripcion] = useState("");
  const [unidades, setUnidades] = useState("");

  useEffect(() => {
    async function getDocumentos() {
      const docRef = doc(db, "inventario", identificador);
      try {
        const docSnap = await getDoc(docRef);
        setDescripcion(docSnap.data()["descripcion"]);
        setUnidades(docSnap.data()["unidades"]);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDocumentos();
  }, [db, identificador]);

  return (
    <tr style={{ background: "#FEEFEC" }}>
      <td>{descripcion}</td>
      <td>{cantidad}</td>
      <td>{unidades}</td>
    </tr>
  );
}

export default ItemIngredienteCocina;
