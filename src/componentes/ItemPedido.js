import { v4 } from 'uuid';
import Detalle from './Detalle';

function ItemPedido({ identificador, fecha, hora, estado, items, total }) {

  let estilo = "";
  let id = identificador.replace(/[0123456789]/gi, 'a');
  let idTarget = "#" + id;
  let productos = [];

  items.forEach(producto => {
    productos.push(
      <Detalle
        key= {v4()}
        nombre= {producto.nombre}
        precio = {producto.precio}
        cantidad = {producto.cantidad}
      />      
    );
  });

  switch (estado) {
    case "Finalizado":
      estilo = "btn rounded-pill btn-primary";
      break;
    case "Listo":
      estilo = "btn rounded-pill btn-success";
      break;
    default:
      estilo = "btn rounded-pill btn-danger";
  };

  return (
    <tr style={{ background: '#FEEFEC' }}>
      <td>{fecha}</td>
      <td>{hora}</td>      
      <td>
        <button type="button" className={estilo} data-bs-toggle="modal" data-bs-target={idTarget}>{estado}</button>
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-fullscreen-md-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Pedido: {fecha} {hora}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className='container'>
                  <table className="table table-borderless">
                    <thead>
                      <tr className='text-light' style={{ background: '#491632' }}>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio Unidad</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos}
                    </tbody>
                  </table>
                  <h5>Total: $ {total}</h5>
                  <div className="d-grid">
                    <button type="button" className={estilo} data-bs-dismiss="modal">{estado}</button>
                  </div>
                </div>

              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>

      </td>
    </tr>
  )
}

export default ItemPedido
