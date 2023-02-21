import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Swal from "sweetalert2";

import { useCartContext } from "../context/RestauranteCartContext";
import ActualizarProducto from "./ActualizarProducto";

const storage = getStorage(firebaseApp);

function Producto({
  identificador,
  nombre,
  descripcion,
  precio,
  tipo,
  urlImagen,
  user,
  getDocumentos,
}) {
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

  function avisoEliminacion(identificador) {
    Swal.fire({
      title: "¿Está seguro?",
      text: "¡No podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(identificador);
      }
    });
  }

  const deleteProduct = async (identificador) => {
    try {
      const docRef = doc(db, "productos", identificador);
      await deleteDoc(docRef);
      const desertRef = ref(storage, "productos/" + identificador);
      await deleteObject(desertRef);
      Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
      getDocumentos();
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  const agregarProducto = async (identificador) => {
    try {
      const docSnap = await obtenerProducto(identificador);
      if (docSnap.exists()) {
        const producto = {
          id: identificador,
          nombre: docSnap.data().nombre_producto,
          precio: docSnap.data().precio,
        };
        const cantidad = parseInt(document.getElementById(identificador).value);
        addProduct(producto, cantidad);
        Swal.fire({
          title: "Agregado al Carrito",
          text: "¡Se ha agregado el producto al carrito de compras!",
          icon: "success",
          confirmButtonColor: "#491632",
          iconColor: "#dc3545",
        });
      } else {
        Swal.fire("Error", "No such document!", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="row p-2 m-2" style={{ background: "#FEEFEC" }}>
        <div className="col-6">
          <h6>{nombre}</h6>
          <br></br>
          <img src={urlImagen} className="img-fluid shadow mb-4" alt="plato" />
          <span>
            <strong>$ {precio}</strong>
          </span>
          <br></br>
          {user && user.rol === "admin" ? (
            <div className="d-grid gap-2 col-6">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={"#actualizar" + identificador}
              >
                Actualizar
              </button>

              <div
                className="modal fade"
                id={"actualizar" + identificador}
                tabIndex="-1"
                aria-labelledby={"actualizar" + identificador + "Label"}
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <ActualizarProducto
                    identificador={identificador}
                    nombre={nombre}
                    descripcion={descripcion}
                    precio={precio}
                    tipo={tipo}
                    urlImg={urlImagen}
                    getDocumentos={getDocumentos}
                  ></ActualizarProducto>
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => avisoEliminacion(identificador)}
              >
                Eliminar
              </button>
            </div>
          ) : (
            <div>
              <div className="input-group">
                <button
                  className="input-group-btn btn btn-outline-danger"
                  onClick={() => disminuir(identificador)}
                >
                  <i className="bi bi-dash-lg"></i>
                </button>
                <input
                  type="text"
                  id={identificador}
                  defaultValue="1"
                  className="form-control input-number"
                ></input>
                <button
                  className="input-group-btn btn btn-outline-danger"
                  onClick={() => incrementar(identificador)}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>

              <br></br>
              <button
                className="btn btn-danger rounded-pill"
                onClick={() => agregarProducto(identificador)}
              >
                <i className="bi bi-cart4"></i>Agregar
              </button>
            </div>
          )}
        </div>
        <div className="col-6">
          <p>{descripcion}</p>
        </div>
      </div>
    </div>
  );
}

export default Producto;
