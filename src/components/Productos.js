import { useState, useEffect } from "react";

import Producto from "./Producto";

import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function Productos({ tipoProducto, user }) {
  const [docProductos, setDocProductos] = useState([]);
  const [tituloProductos, setTituloProductos] = useState("");

  useEffect(() => {
    const db = getFirestore(firebaseApp);

    switch (tipoProducto) {
      case "plato":
        setTituloProductos("Platos");
        break;
      case "sushi":
        setTituloProductos("Sushi");
        break;
      case "promo":
        setTituloProductos("Promociones");
        break;
      case "bebida":
        setTituloProductos("Bebidas");
        break;
      default:
        setTituloProductos("");
        break;
    }

    const getDocumentos = async () => {
      try {
        let q = query(
          collection(db, "productos"),
          where("tipo", "==", tipoProducto)
        );
        let querySnapshot = await getDocs(q);
        setDocProductos(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    };

    getDocumentos();
  }, [tipoProducto]);

  const listaProductos = [];

  docProductos.forEach((doc) => {
    listaProductos.push(
      <Producto
        key={doc.id}
        identificador={doc.id}
        nombre={doc.data()["nombre_producto"]}
        descripcion={doc.data()["descripcion"]}
        precio={doc.data()["precio"]}
        urlImagen={doc.data()["url_imagen"]}
        user={user}
      />
    );
  });

  return (
    <div>
      <h4 className="text-light" style={{ background: "#491632" }}>
        {tituloProductos}
      </h4>
      <div className="row">{listaProductos}</div>
    </div>
  );
}

export default Productos;
