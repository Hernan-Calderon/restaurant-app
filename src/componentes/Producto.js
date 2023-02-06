import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { useCartContext } from "../context/RestauranteCartContext";


function Producto({ identificador, nombre, descripcion, precio, urlImagen }) {

  const { addProduct } = useCartContext();

  const db = getFirestore(firebaseApp);

  async function obtenerProducto(identificador) {
    const docRef = doc(db, "productos", identificador);
    const docSnap = await getDoc(docRef);
    return docSnap;
  }

  function incrementar(id) {
    let valor = parseInt(document.getElementById(id).value);
    valor += 1;
    document.getElementById(id).value = valor;    
  }

  function disminuir(id) {
    let valor = parseInt(document.getElementById(id).value);
    if (valor > 1) {
      valor -= 1;
      document.getElementById(id).value = valor;      
    }
  }

  const agregarProducto = async (identificador) => {
    try {
      const docSnap = await obtenerProducto(identificador);
      if (docSnap.exists()) {
        const producto = { id: identificador, nombre: docSnap.data().nombre_producto, precio: docSnap.data().precio }
        const cantidad = parseInt(document.getElementById(identificador).value);
        addProduct(producto, cantidad);
        alert("¡Se ha agregado el producto al carrito!");
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='col-12 col-md-6 col-xl-4'>
      <div className="row p-2 m-2" style={{ background: '#FEEFEC' }}>
        <div className="col-6">
          <h6>{nombre}</h6>
          <br></br>
          <img src={urlImagen} className="img-fluid shadow mb-4" alt='plato' />
          <span><strong>$ {precio}</strong></span>
          <br></br>

          <div className="input-group">
            <button className="input-group-btn btn btn-outline-danger" onClick={() => disminuir(identificador)}><i className="bi bi-dash-lg"></i></button>
            <input type="text" id={identificador} defaultValue="1" className="form-control input-number"></input>
            <button className="input-group-btn btn btn-outline-danger" onClick={() => incrementar(identificador)}><i className="bi bi-plus-lg"></i></button>
          </div>

          <br></br>
          <button className="btn btn-danger rounded-pill" onClick={() => agregarProducto(identificador)}><i className="bi bi-cart4"></i>Agregar</button>
        </div>
        <div className="col-6">
          <p>{descripcion}</p>
        </div>
      </div>
    </div>
  );

}

export default Producto;