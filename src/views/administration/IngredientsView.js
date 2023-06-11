import React, { useState, useEffect } from "react";

import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import ItemIngredientes from "../../components/ItemIngredientes";

function IngredientsView() {
  const db = getFirestore(firebaseApp);

  const [productos, setProductos] = useState([]);
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    async function getDocumentos() {
      const consulta = query(
        collection(db, "productos"),
        orderBy("nombre_producto")
      );
      const consulta2 = query(
        collection(db, "inventario"),
        orderBy("descripcion")
      );
      try {
        const querySnapshot2 = await getDocs(consulta2);
        setInventario(querySnapshot2);
        const querySnapshot = await getDocs(consulta);
        setProductos(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDocumentos();
  }, [db]);

  const itemsInventario = [];

  inventario.forEach((ingrediente) => {
    let item = {
      id_item: ingrediente.id,
      descripcion: ingrediente.data()["descripcion"],
      unidades: ingrediente.data()["unidades"],
    };
    itemsInventario.push(item);
  });

  const items = [];

  productos.forEach((producto) => {
    items.push(
      <ItemIngredientes
        key={producto.id}
        identificador={producto.id}
        nombre_producto={producto.data()["nombre_producto"]}
        descripcion={producto.data()["descripcion"]}
        precio={producto.data()["precio"]}
        tipo={producto.data()["tipo"]}
        url_imagen={producto.data()["url_imagen"]}
        inventario={itemsInventario}
      />
    );
  });

  return (
    <div className="container">
      <h1>Ingredientes</h1>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr className="text-light" style={{ background: "#491632" }}>
              <th scope="col">Producto</th>
              <th scope="col">Ingredientes</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
      <br></br>
    </div>
  );
}

export default IngredientsView;
