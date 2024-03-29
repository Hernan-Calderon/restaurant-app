import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import ItemPedido from "../../components/ItemPedido";

function OrdersView({ user }) {
  const [pedidos, setPedidos] = useState([]);

  const idUsuario = useMemo(() => {
    return user.uid;
  }, [user]);

  useEffect(() => {
    const db = getFirestore(firebaseApp);

    async function getPedidos() {
      let consulta = query(
        collection(db, "pedidos"),
        where("id_usuario", "==", idUsuario)
      );
      try {
        let querySnapshot = await getDocs(consulta);
        setPedidos(querySnapshot);
      } catch (error) {
        console.log(error.message);
      }
    }
    getPedidos();
  }, [idUsuario, pedidos]);

  const items = [];

  pedidos.forEach((doc) => {
    items.push(
      <ItemPedido
        key={doc.id}
        identificador={doc.id}
        fechaString={doc.data()["fecha_string"]}
        hora={doc.data()["hora"]}
        estado={doc.data()["estado"]}
        items={doc.data()["items"]}
        total={doc.data()["total"]}
        propina={doc.data()["propina"]}
        calificacion={doc.data()["valoracion"]}
        observacion={doc.data()["observaciones"]}
        pagoElectronico={doc.data()["pago_electronico"]}
        pagoEfectivo={doc.data()["pago_efectivo"]}
        user={user}
      />
    );
  });

  return (
    <div className="container">
      <h1 style={{ color: "#491632" }}>Pedidos</h1>
      <br></br>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr className="text-light" style={{ background: "#491632" }}>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Detalle</th>
              <th scope="col">Valoración</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
      <br></br>
      <div className="d-grid d-md-flex justify-content-md-end">
        <Link className="btn btn-danger rounded-pill" to="/productos">
          Ir al Menú
        </Link>
      </div>
      <br></br>
    </div>
  );
}

export default OrdersView;
