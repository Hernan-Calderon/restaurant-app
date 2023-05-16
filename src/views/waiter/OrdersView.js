import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

import ItemPedidoMesero from "../../components/ItemPedidoMesero";

function OrdersView({ user }) {
  const [pedidos, setPedidos] = useState([]);

  const fechaBase = () => {
    let hoy = new Date();
    let treintaDias = 1000 * 60 * 60 * 24 * 1;
    let resta = hoy.getTime() - treintaDias;
    return new Date(resta);
  };

  useEffect(() => {
    const db = getFirestore(firebaseApp);

    async function getPedidos() {
      let consulta = query(
        collection(db, "pedidos"),
        where("fecha", ">=", Timestamp.fromDate(fechaBase()))
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
      <ItemPedidoMesero
        key={doc.id}
        identificador={doc.id}
        fechaString={doc.data()["fecha_string"]}
        hora={doc.data()["hora"]}
        estado={doc.data()["estado"]}
        mesa={doc.data()["mesa"]}
        items={doc.data()["items"]}
        total={doc.data()["total"]}
        pagoElectronico={doc.data()["pago_electronico"]}
        pagoEfectivo={doc.data()["pago_efectivo"]}
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
              <th scope="col">Mesa</th>
              <th scope="col">Entregado</th>
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
