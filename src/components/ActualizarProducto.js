import { useState } from "react";
import Swal from "sweetalert2";

import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  deleteObject,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage(firebaseApp);

function ActualizarProducto({
  identificador,
  nombre,
  descripcion,
  precio,
  tipo,
  urlImg,
  getDocumentos,
}) {
  const db = getFirestore(firebaseApp);
  const listaProductos = require("../assets/tipo-producto.json");

  const [archivo, setFile] = useState(null);
  const [nombreImagen, setNombreImagen] = useState("");
  const [urlImagen, setUrlImagen] = useState(urlImg);
  const [nombreProducto, setNombreProducto] = useState(nombre);
  const [precioProducto, setPrecioProducto] = useState(precio);
  const [tipoProducto, setTipoProducto] = useState(tipo);
  const [descripProducto, setDescripProducto] = useState(descripcion);

  async function upDateFile(file) {
    const ruta = "productos/" + identificador;
    const referencia = ref(storage, ruta);
    await deleteObject(referencia);
    await uploadBytes(referencia, file);
    const url = await getDownloadURL(referencia);
    return url;
  }

  function updateForm() {
    setFile(null);
    setNombreImagen("");
    setUrlImagen(urlImg);
    setNombreProducto(nombre);
    setPrecioProducto(precio);
    setTipoProducto(tipo);
    setDescripProducto(descripcion);
  }

  const updateProduct = async (evento) => {
    evento.preventDefault();
    try {
      const docRef = doc(db, "productos", identificador);
      if (archivo !== null) {
        const url = await upDateFile(archivo);
        setUrlImagen(url);
      }

      await updateDoc(docRef, {
        nombre_producto: nombreProducto,
        precio: precioProducto,
        descripcion: descripProducto,
        tipo: tipoProducto,
        url_imagen: urlImagen,
      });
      Swal.fire(
        "Actualizado",
        "El Producto se ha actualizado con éxito.",
        "success"
      );
      getDocumentos();
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="crearProductoLabel">
          Actualizar Producto
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => updateForm()}
        ></button>
      </div>
      <div className="modal-body">
        <form onSubmit={updateProduct}>
          <div className="row">
            <div className="form-group col-md-6">
              <br></br>
              <label htmlFor="nombre" className="form-label">
                Nombre del producto
              </label>
              <input
                onChange={(evento) => {
                  setNombreProducto(evento.target.value);
                }}
                required
                type={"text"}
                className="form-control"
                id="nombre"
                placeholder="Producto"
                value={nombreProducto}
              />
            </div>

            <div className="form-group col-md-6">
              <br></br>
              <label htmlFor="precio" className="form-label">
                Precio del producto
              </label>
              <input
                onChange={(evento) => {
                  setPrecioProducto(evento.target.value);
                }}
                required
                type={"number"}
                className="form-control"
                id="precio"
                placeholder="Precio"
                value={precioProducto}
              />
            </div>

            <div className="form-group col-md-6">
              <br></br>
              <label htmlFor="tipo" className="form-label">
                Tipo de producto
              </label>
              <select
                className="form-control"
                id="tipo"
                value={tipoProducto}
                onChange={(evento) => {
                  setTipoProducto(evento.target.value);
                }}
              >
                {listaProductos.map((producto) => (
                  <option key={producto.id} value={producto.tipo}>
                    {producto.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-6">
              <br></br>
              <label htmlFor="descripcion" className="form-label">
                Descripción del producto
              </label>
              <textarea
                onChange={(evento) => {
                  setDescripProducto(evento.target.value);
                }}
                required
                className="form-control"
                id="descripcion"
                rows="3"
                placeholder="Descripción"
                value={descripProducto}
              ></textarea>
            </div>

            <div className="form-group col-12 mb-3">
              <br></br>
              <label htmlFor="archivo" className="form-label">
                Imagen producto (Relación de aspecto: 1:1)
              </label>
              <input
                type="file"
                className="form-control"
                id="archivo"
                value={nombreImagen}
                onChange={(evento) => {
                  setFile(evento.target.files[0]);
                  setNombreImagen(evento.target.value);
                }}
              />
            </div>
            <hr></hr>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => updateForm()}
              >
                Close
              </button>
              <button type="submit" className="btn btn-danger">
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActualizarProducto;
