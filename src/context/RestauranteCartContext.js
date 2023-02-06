import { createContext, useContext, useState } from 'react';

const CartContext = createContext([]);
export const useCartContext = ()=> useContext(CartContext);

function CartProvider({ children }) {

  const [cart,setCart]= useState([]);
  const [pedido, setPedido]=useState([]);  

  const cleanCart = ()=>setCart([]);  
  const cleanPedido = ()=>setPedido([]);
  const isInCart = (id)=>cart.find(product=>product.id===id)?true:false;
  const removeCart = (id) => setCart(cart.filter(product=>product.id!==id ));

  const addProduct= (producto,cantidad) =>{
    if(isInCart(producto.id)){
      setCart(cart.map(item =>{
        return item.id === producto.id?{...item, cantidad:item.cantidad+cantidad}:item;
      }));      
    }
    else{
      setCart([...cart,{...producto, cantidad:cantidad}]);      
    }
  }
  
  const precioTotal = () =>{
    return cart.reduce(
      (acumulador, actual)=>acumulador+actual.cantidad*actual.precio,0
    );
  }

  const isInPedido = (id)=>pedido.find(product=>product.id===id)?true:false;

  const reconstruirPedido= (producto,cantidad) =>{
    if(!isInPedido(producto.id)){
      setPedido([...pedido,{...producto, cantidad:cantidad}]); 
    }      
  }

  const totalPedido = () =>{
    return pedido.reduce(
      (acumulador, actual)=>acumulador+actual.cantidad*actual.precio,0
    );
  }

  const cantidadTotal=()=>cart.reduce((acumulador, actual)=>acumulador+actual.cantidad,0);

  return (
    <CartContext.Provider value={{
      cleanCart,
      isInCart,
      removeCart,
      addProduct,
      precioTotal,
      cantidadTotal,
      totalPedido,
      reconstruirPedido,
      cleanPedido,
      cart,
      pedido
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;