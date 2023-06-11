import React, { useState, useEffect } from "react";

import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import ItemIngredientesCocina from "../../components/ItemIngredientesCocina";

function IngredientsView() {
  const db = getFirestore(firebaseApp);

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function getDocumentos() {
      const consulta = query(
        collection(db, "productos"),
        orderBy("nombre_producto")
      );
      try {
        const querySnapshot = await getDocs(consulta);
        setProductos(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDocumentos();
  }, [db]);

  const items = [];

  productos.forEach((producto) => {
    items.push(
      <ItemIngredientesCocina
        key={producto.id}
        identificador={producto.id}
        nombre_producto={producto.data()["nombre_producto"]}
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
