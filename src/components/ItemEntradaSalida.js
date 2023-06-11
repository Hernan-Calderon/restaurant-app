import React, { useState, useEffect } from "react";

import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function ItemEntradaSalida({
  item_id,
  presentacion,
  cantidad,
  fecha,
  hora,
  comentarios,
}) {
  const db = getFirestore(firebaseApp);
  const [descripcion, setDescripcion] = useState("");
  const [unidades, setUnidades] = useState("");

  useEffect(() => {
    async function getDocumentos() {
      const docRef = doc(db, "inventario", item_id);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDescripcion(docSnap.data()["descripcion"]);
          setUnidades(docSnap.data()["unidades"]);
        } else {
          setDescripcion("No such document!");
          setUnidades("No such document!");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getDocumentos();
  }, [db, item_id]);
  return (
    <tr style={{ background: "#FEEFEC" }}>
      <td>{descripcion}</td>
      <td>{presentacion}</td>
      <td>{unidades}</td>
      <td>{cantidad}</td>
      <td>{fecha}</td>
      <td>{hora}</td>
      <td>{comentarios}</td>
    </tr>
  );
}

export default ItemEntradaSalida;
