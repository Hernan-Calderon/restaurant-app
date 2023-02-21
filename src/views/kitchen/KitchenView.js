import { useEffect, useState } from "react";
import firebaseApp from "../../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import Titulo from "../../components/Titulo";
import ItemPedidoCocina from "../../components/ItemPedidoCocina";

import logoRestaurante from "../../images/logo_restaurante.png";

const auth = getAuth(firebaseApp);

function KitchenView({ user }) {
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
        fecha={doc.data()["fecha"]}
        hora={doc.data()["hora"]}
        estado={doc.data()["estado"]}
        mesa={doc.data()["mesa"]}
        items={doc.data()["items"]}
      />
    );
  });

  return (
    <div className="container">
      <p>Bienvenid@ {user.email}</p>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => signOut(auth)}
        >
          Cerrar Sesión
        </button>
      </div>

      <Titulo imagenTitulo={logoRestaurante} />
      <h1>Cocina Restaurante</h1>
      <div className="row">{items}</div>
    </div>
  );
}

export default KitchenView;
