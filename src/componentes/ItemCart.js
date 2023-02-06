import { useCartContext } from "../context/RestauranteCartContext";

function ItemCart({ producto }) {

  const { removeCart } = useCartContext();

  return (
    <tr style={{ background: '#FEEFEC' }}>
      <th scope="row">{producto.nombre}</th>
      <td>$ {producto.precio}</td>
      <td>{producto.cantidad}</td>
      <td>$ {producto.cantidad * producto.precio}</td>
      <td>
        <button className="btn btn-danger" onClick={() => removeCart(producto.id)}><i className="bi bi-trash3-fill"></i></button>
      </td>
    </tr>
  );
}

export default ItemCart;