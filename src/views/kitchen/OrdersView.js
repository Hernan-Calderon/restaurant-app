import { useEffect, useState } from "react";

import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import Titulo from "../../components/Titulo";
import ItemPedidoCocina from "../../components/ItemPedidoCocina";

import triste from "../../images/triste.png";

function OrdersView({ user }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const db = getFirestore(firebaseApp);

    async function getPedidos() {
      let consulta = query(
        collection(db, "pedidos"),
        where("estado", "==", "Preparando")
      );
      try {
        let querySnapshot = await getDocs(consulta);
        setPedidos(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    }
    getPedidos();
  }, [pedidos]);

  const items = [];

  pedidos.forEach((doc) => {
    items.push(
      <ItemPedidoCocina
        key={doc.id}
        identificador={doc.id}
        fechaString={doc.data()["fecha_string"]}
        hora={doc.data()["hora"]}
        estado={doc.data()["estado"]}
        mesa={doc.data()["mesa"]}
        items={doc.data()["items"]}
      />
    );
  });

  return (
    <div className="container">
      <h1>Pedidos cocina</h1>
      <p>Bienvenid@ {user.email}</p>
      {items.length === 0 ? (
        <div>
          <p>¡No hay pedidos pendientes!</p>
          <Titulo imagenTitulo={triste} />
          <br></br>
        </div>
      ) : (
        <div className="row">{items}</div>
      )}
    </div>
  );
}

export default OrdersView;
