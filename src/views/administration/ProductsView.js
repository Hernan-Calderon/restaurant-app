import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import firebaseApp from "../../firebase/credenciales";
import CrearProducto from "../../components/CrearProducto";
import Producto from "../../components/Producto";
import BtnMenu from "../../components/BtnMenu";

function ProductsView({ user }) {
  const db = getFirestore(firebaseApp);
  const productos = require("../../assets/tipo-producto.json");

  const [tipoProducto, setTipoProducto] = useState("plato");
  const [docProductos, setDocProductos] = useState([]);
  const [tituloProductos, setTituloProductos] = useState("");

  async function getDocumentos() {
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
  }

  useEffect(() => {
    setTituloProductos(
      productos.find((producto) => producto.tipo === tipoProducto).titulo
    );
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
        tipo={doc.data()["tipo"]}
        urlImagen={doc.data()["url_imagen"]}
        user={user}
        getDocumentos={getDocumentos}
      />
    );
  });

  return (
    <div className="container">
      <h1>Administración de Productos</h1>

      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#crearProducto"
      >
        Crear Producto
      </button>

      <div
        className="modal fade"
        id="crearProducto"
        tabIndex="-1"
        aria-labelledby="crearProductoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <CrearProducto
            tipo={tipoProducto}
            getDocumentos={getDocumentos}
          ></CrearProducto>
        </div>
      </div>
      <hr></hr>
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
  );
}

export default ProductsView;
