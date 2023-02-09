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

function Productos() {
  const [docPlatos, setDocPlatos] = useState([]);
  const [docSushi, setDocSushi] = useState([]);
  const [docBebidas, setDocBebidas] = useState([]);

  useEffect(() => {
    const db = getFirestore(firebaseApp);
    const getDocumentos = async () => {
      try {
        let q = query(
          collection(db, "productos"),
          where("tipo", "==", "plato")
        );
        let querySnapshot = await getDocs(q);
        setDocPlatos(querySnapshot);
        q = query(collection(db, "productos"), where("tipo", "==", "sushi"));
        querySnapshot = await getDocs(q);
        setDocSushi(querySnapshot);
        q = query(collection(db, "productos"), where("tipo", "==", "bebida"));
        querySnapshot = await getDocs(q);
        setDocBebidas(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    };

    getDocumentos();
  }, []);

  const platos = [];
  const bebidas = [];
  const sushi = [];

  function listarProductos(documentos, lista) {
    documentos.forEach((doc) => {
      lista.push(
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
  }

  listarProductos(docPlatos, platos);
  listarProductos(docBebidas, bebidas);
  listarProductos(docSushi, sushi);

  return (
    <div>
      <h1 style={{ color: "#491632" }}>Menú</h1>
      <br></br>
      <h4 className="text-light" style={{ background: "#491632" }}>
        Sushi
      </h4>
      <div className="row">{sushi}</div>
      <h4 className="text-light" style={{ background: "#491632" }}>
        Platos
      </h4>
      <div className="row">{platos}</div>
      <h4 className="text-light" style={{ background: "#491632" }}>
        Bebidas
      </h4>
      <div className="row">{bebidas}</div>
    </div>
  );
}

export default Productos;
