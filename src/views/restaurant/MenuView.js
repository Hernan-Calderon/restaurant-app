import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import firebaseApp from "../../firebase/credenciales";
import Producto from "../../components/Producto";
import BtnCarrito from "../../components/BtnCarrito";
import BtnMenu from "../../components/BtnMenu";

function MenuView({ user }) {
  const productos = require("../../assets/tipo-producto.json");

  const [docProductos, setDocProductos] = useState([]);
  const [tipoProducto, setTipoProducto] = useState("plato");
  const [tituloProductos, setTituloProductos] = useState("Platos");

  useEffect(() => {
    const db = getFirestore(firebaseApp);

    setTituloProductos(
      productos.find((producto) => producto.tipo === tipoProducto).titulo
    );

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
      <BtnCarrito />
      <div className="container">
        <h1 style={{ color: "#491632" }}>Menú</h1>

        <div className="btn-group" role="group">
          {productos.map((producto) => (
            <BtnMenu
              key={producto.id}
              tipo={producto.tipo}
              titulo={producto.titulo}
              setTipoProducto={setTipoProducto}
            ></BtnMenu>
          ))}
        </div>

        <hr></hr>
        <div>
          <h4 className="text-light" style={{ background: "#491632" }}>
            {tituloProductos}
          </h4>
          <div className="row">{listaProductos}</div>
        </div>
      </div>
    </div>
  );
}

export default MenuView;
