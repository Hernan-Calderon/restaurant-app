import { useState } from "react";
import { useCartContext } from "../context/RestauranteCartContext";

function ItemCart({ producto }) {
  const { removeCart } = useCartContext();

  const [nota, setNota] = useState(producto.nota);

  const actualizarNota = (evento) => {
    evento.preventDefault();
    producto.nota = nota;
  };

  const cleanNote = () => {
    setNota(producto.nota);
  };

  return (
    <tr style={{ background: "#FEEFEC" }}>
      <th scope="row">{producto.nombre}</th>
      <td>$ {producto.precio}</td>
      <td>{producto.cantidad}</td>
      <td>$ {producto.cantidad * producto.precio}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target={"#anotar" + producto.id}
        >
          Nota
        </button>
        <div
          className="modal fade"
          id={"anotar" + producto.id}
          tabIndex="-1"
          aria-labelledby={"anotar" + producto.id + "Label"}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="anotarLabel">
                  Anotación producto
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => cleanNote()}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={actualizarNota}>
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="nota" className="form-label">
                        Nota
                      </label>
                      <textarea
                        className="form-control"
                        id="nota"
                        rows="3"
                        placeholder="Nota"
                        value={nota}
                        onChange={(evento) => {
                          setNota(evento.target.value);
                        }}
                      ></textarea>
                      <br></br>
                    </div>

                    <hr></hr>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={() => cleanNote()}
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-danger">
                        Actualizar Nota
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => removeCart(producto.id)}
        >
          <i className="bi bi-trash3-fill"></i>
        </button>
      </td>
    </tr>
  );
}

export default ItemCart;
