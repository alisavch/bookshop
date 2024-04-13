import React from "react";
import Item from './Item'
import "./style.css"
import { getCartItems, getCartTotalAmount } from '../utils/localStorage';

function Cart () {
    const cartItems = getCartItems();
    const totalAmount = getCartTotalAmount();

      return (
        <div className="cart">
            <div className="items">
                {cartItems.map((item) => (
                    <Item item={item} inCart={true}/>
                ))}
            </div>
            <p>Total Price: {totalAmount}</p>
        </div>)
}

export default Cart;