import React, { useState, useEffect } from "react";

import Producto from "../../components/Producto";

import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import CrearProducto from "../../components/CrearProducto";

function ProductsView({ user }) {
  const db = getFirestore(firebaseApp);
  const [tipoProducto, setTipoProducto] = useState("plato");
  const [docProductos, setDocProductos] = useState([]);
  const [tituloProductos, setTituloProductos] = useState("");

  const productos = [
    { tipo: "plato", titulo: "Platos" },
    { tipo: "sushi", titulo: "Sushi" },
    { tipo: "promo", titulo: "Promociones" },
    { tipo: "bebida", titulo: "Bebidas" },
  ];

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
        urlImagen={doc.data()["url_imagen"]}
        user={user}
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
            tipoProducto={tipoProducto}
            getDocumentos={getDocumentos}
          ></CrearProducto>
        </div>
      </div>
      <hr></hr>
      <div className="btn-group" role="group">
        {productos.map((producto) => (
          <>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id={producto.tipo}
              autoComplete="off"
              defaultChecked={producto.tipo === "plato"}
            />
            <label
              className="btn btn-outline-danger"
              htmlFor={producto.tipo}
              onClick={() => setTipoProducto(producto.tipo)}
            >
              {producto.titulo}
            </label>
          </>
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
