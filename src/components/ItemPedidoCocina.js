import React from 'react'

import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

import { v4 } from 'uuid';
import DetalleCocina from './DetalleCocina';

function ItemPedidoCocina({ identificador, fecha, hora, estado, items }) {
  const db = getFirestore(firebaseApp);
   
  let productos = [];

  items.forEach(producto => {
    productos.push(
      <DetalleCocina
        key={v4()}
        nombre={producto.nombre}        
        cantidad={producto.cantidad}
      />
    );
  });
  
  const actualizarPedido = async ()=>{
    try {      
      const docuRef = doc(db, "pedidos/"+identificador);
      await updateDoc(docuRef, { estado: "Listo" });
      alert("El pedido se ha marcado como Listo.");
      
    } catch (error) {
      alert(error.message);
    }
  }
  

  return (
    <div className='col-12 col-md-6 col-xl-4'>
      <br></br>
      <h3 >Pedido: {fecha} {hora}</h3>
      <div className='container'>
        <table className="table table-borderless">
          <thead>
            <tr className='text-light' style={{ background: '#491632' }}>
              <th scope="col">Producto</th>              
              <th scope="col">Cantidad</th>              
            </tr>
          </thead>
          <tbody>
            {productos}
          </tbody>
        </table>        
        <h5>Estado: {estado}</h5>
        <div className="d-grid">
          <button type="button" className="btn rounded-pill btn-danger" onClick={actualizarPedido}>Marcar como Listo</button>
        </div>
      </div>
    </div>
  )
}

export default ItemPedidoCocina
