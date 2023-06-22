import React, { useState, useEffect } from "react";

import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function ItemIngrediente({ identificador, cantidad, eliminarIngrediente }) {
  const db = getFirestore(firebaseApp);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    async function getDocumentos() {
      const docRef = doc(db, "inventario", identificador);
      try {
        const docSnap = await getDoc(docRef);
        const descr = docSnap.data()["descripcion"];
        setDescripcion(descr);
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
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminarIngrediente(identificador)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default ItemIngrediente;
