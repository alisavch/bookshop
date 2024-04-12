import React, {useState, useEffect} from "react";
import Item from './Item'
import "./style.css"
import { GOOGLE_BOOKS_URL } from "../api/api";

function Cart ({sessionId}) {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchCartItems();
        fetchCartTotalAmount();
      }, []);

      const fetchCartItems = async () => {
        // try {
        //   const resp = await fetch('');
        //   if (!resp.ok) {
        //     throw new Error('Failed to fetch cart items');
        //   }
        //   const data = await resp.json();
        //   setCartItems(data);
        // } catch (error) {
        //   console.error('Error fetching cart items:', error);
        // }
        try {
          const resp = await fetch(`${GOOGLE_BOOKS_URL}/volumes?q=nosql`);
          if (!resp.ok) {
              throw new Error('Failed to fetch items')
          }

          const data = await resp.json();
          setCartItems(data.items)
      } catch (error) {
          console.error('Error fetching items:', error);
      }
      };

      const fetchCartTotalAmount = async () => {
        try {
          const resp = await fetch('');
          if (!resp.ok) {
            throw new Error('Failed to fetch cart total amount');
          }
          const data = await resp.json();
          setTotalAmount(data);
        } catch (error) {
          console.error('Error fetching cart total amount:', error);
        }
      };

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