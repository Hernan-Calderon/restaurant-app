import { useState } from "react";

import Productos from "../../components/Productos";
import Titulo from "../../components/Titulo";

import cc from "../../images/cc.png";

import firebaseApp from "../../firebase/credenciales";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";

import { v4 } from "uuid";

const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

function AdminView({ user }) {
  const db = getFirestore(firebaseApp);

  const [archivo, setFile] = useState(null);

  async function uploadFile(file) {
    const ruta = "productos/" + v4();
    const storageRef = ref(storage, ruta);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return [url, ruta];
  }

  const handlerFiles = async (evento) => {
    evento.preventDefault();
    const nombre = evento.target.elements.nombre.value;
    const precio = parseInt(evento.target.elements.precio.value);
    const tipo = evento.target.elements.tipo.value;
    const descripcion = evento.target.elements.descripcion.value;
    try {
      const carga = await uploadFile(archivo);
      const docuRef = doc(db, carga[1]);
      await setDoc(docuRef, {
        nombre_producto: nombre,
        precio: precio,
        descripcion: descripcion,
        tipo: tipo,
        url_imagen: carga[0],
      });

      alert("El archivo se ha subido con éxito.");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

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

      <Titulo imagenTitulo={cc} />
      <h1>Administración Restaurante</h1>

      <form onSubmit={handlerFiles}>
        <div className="row pb-3 shadow">
          <div className="form-group col-md-6">
            <br></br>
            <label htmlFor="nombre">Nombre del producto:</label>
            <input
              type={"text"}
              className="form-control"
              id="nombre"
              placeholder="Producto"
            />
          </div>

          <div className="form-group col-md-6">
            <br></br>
            <label htmlFor="precio">Precio del producto:</label>
            <input
              type={"number"}
              className="form-control"
              id="precio"
              placeholder="Precio"
            />
          </div>

          <div className="form-group col-md-6">
            <br></br>
            <label htmlFor="tipo">Tipo de producto:</label>
            <input
              type={"text"}
              className="form-control"
              id="tipo"
              placeholder="Ej: plato, bebida, promo"
            />
          </div>

          <div className="form-group col-md-6">
            <br></br>
            <label htmlFor="descripcion">Descripción del producto</label>
            <textarea
              className="form-control"
              id="descripcion"
              rows="3"
              placeholder="Descripción"
            ></textarea>
          </div>

          <div className="form-group col-md-6">
            <br></br>
            <label htmlFor="archivo">Imagen producto</label>
            <input
              type={"file"}
              className="form-control-file"
              id="archivo"
              onChange={(evento) => setFile(evento.target.files[0])}
            />
          </div>

          <div className="d-grid d-sm-flex justify-content-sm-end">
            <br></br>
            <button type="submit" className="btn btn-danger btn-sm">
              Enviar
            </button>
          </div>
        </div>
      </form>

      <br></br>
      <Productos />
    </div>
  );
}

export default AdminView;
