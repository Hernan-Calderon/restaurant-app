import { useState, useEffect } from "react";

import Producto from "./Producto";
import BtnCarrito from "./BtnCarrito";

import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function RestaurantePromo({ user }) {
  const [docPromo, setDocPromo] = useState([]);

  useEffect(() => {
    const db = getFirestore(firebaseApp);
    async function getDocumentos() {
      try {
        const consulta = query(
          collection(db, "productos"),
          where("tipo", "==", "promo")
        );
        const querySnapshot = await getDocs(consulta);
        setDocPromo(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDocumentos();
  }, []);

  const promociones = [];

  docPromo.forEach((doc) => {
    promociones.push(
      <Producto
        key={doc.id}
        identificador={doc.id}
        nombre={doc.data()["nombre_producto"]}
        descripcion={doc.data()["descripcion"]}
        precio={doc.data()["precio"]}
        urlImagen={doc.data()["url_imagen"]}
      />
    );
  });

  return (
    <div>
      <BtnCarrito />
      <div className="container">
        <h1 style={{ color: "#491632" }}>Promociones</h1>
        <br></br>
        <div className="row">{promociones}</div>
      </div>
    </div>
  );
}

export default RestaurantePromo;
