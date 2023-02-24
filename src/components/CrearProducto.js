import { useState } from "react";
import Swal from "sweetalert2";

import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid";

const storage = getStorage(firebaseApp);

function CrearProducto({ tipo, getDocumentos }) {
  const db = getFirestore(firebaseApp);
  const listaProductos = require("../assets/tipo-producto.json");

  const [archivo, setFile] = useState(null);
  const [nombreImagen, setNombreImagen] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState(0);
  const [tipoProducto, setTipoProducto] = useState("plato");
  const [descripProducto, setDescripProducto] = useState("");

  async function uploadFile(file) {
    const ruta = "productos/" + v4();
    const storageRef = ref(storage, ruta);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return [url, ruta];
  }

  function cleanForm() {
    setFile(null);
    setNombreImagen("");
    setNombreProducto("");
    setPrecioProducto(0);
    setTipoProducto("plato");
    setDescripProducto("");
  }

  const createProduct = async (evento) => {
    evento.preventDefault();
    try {
      const carga = await uploadFile(archivo);
      const docuRef = doc(db, carga[1]);
      await setDoc(docuRef, {
        nombre_producto: nombreProducto,
        precio: precioProducto,
        descripcion: descripProducto,
        tipo: tipoProducto,
        url_imagen: carga[0],
      });
      Swal.fire("Creado", "El Producto se ha creado con éxito.", "success");
      if (tipo === tipoProducto) {
        getDocumentos();
      }
      cleanForm();
    } catch (error) {
      Swal.fire("Error", error.message.slice(10), "error");
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="crearProductoLabel">
          Crear Producto
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => cleanForm()}
        ></button>
      </div>
      <div className="modal-body">
        <form onSubmit={createProduct}>
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
                required
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
                onClick={() => cleanForm()}
              >
                Close
              </button>
              <button type="submit" className="btn btn-danger">
                Crear Producto
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="modal-footer"></div>
    </div>
  );
}

export default CrearProducto;
