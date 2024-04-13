import React from "react";
import Item from './Item'
import "./style.css"
import { useCart } from '../context/CartProvider';

function Cart () {
  const { cart, getCartAmount } = useCart();
    return (
      <div className="cart">
          <div className="items">
              {cart.map((item) => (
                  <Item item={item} inCart={true}/>
              ))}
          </div>
          <p>Total Price: {getCartAmount()}</p>
      </div>)
}

export default Cart;
