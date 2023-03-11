import { Link, useNavigate } from "react-router-dom";

import { useCartContext } from "../../context/RestauranteCartContext";
import ItemCart from "../../components/ItemCart";
import Titulo from "../../components/Titulo";

import triste from "../../images/triste.png";

function CartView() {
  const { cart, precioTotal, cleanCart } = useCartContext();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container">
        <p>¡No hay productos en el carrito!</p>
        <div>
          <Link className="btn btn-danger rounded-pill" to="/productos">
            Ir al menú
          </Link>
        </div>
        <Titulo imagenTitulo={triste} />
        <br></br>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>
        <i className="bi bi-cart4"></i>Carrito
      </h1>
      <br></br>
      <table className="table table-borderless">
        <thead>
          <tr className="text-light" style={{ background: "#491632" }}>
            <th scope="col">Producto</th>
            <th scope="col">Precio Unidad</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Anotaciones</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <ItemCart key={product.id} producto={product} />
          ))}
        </tbody>
      </table>
      <h5>Total: $ {precioTotal()}</h5>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link className="btn btn-danger rounded-pill" to="/productos">
          Continuar Agregagando
        </Link>
        <button
          className="btn btn-danger rounded-pill"
          onClick={() => cleanCart()}
        >
          Limpiar Carrito
        </button>
        <button
          className="btn btn-danger rounded-pill"
          onClick={() => navigate("/confirmar")}
        >
          Confirmar Pedido
        </button>
      </div>
      <br></br>
    </div>
  );
}

export default CartView;
