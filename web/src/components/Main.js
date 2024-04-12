import React, {useState, useEffect} from "react";
import "./style.css"
import Item from './Item'
import { addToCart, GOOGLE_BOOKS_URL } from "../api/api";

function Main ({sessionId}) {
    const [items, setItems] = useState([]);
    // const [cartItemCount, setCartItemCount] = useState(0);
    
    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = async () => {
        try {
            const resp = await fetch(`${GOOGLE_BOOKS_URL}/volumes?q=nosql`);
            if (!resp.ok) {
                throw new Error('Failed to fetch items')
            }

            const data = await resp.json();
            setItems(data.items)
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

    return (
    <div>
    <div className="main-container ">
    <p className="main-title"><b>Book Results</b></p>
        <div className="items">
            {items.map((item) => (
                <Item item={item} addToCart={addToCart(sessionId, item.id)}/>
            ))}
        </div>
    </div>
    </div>)
}

export default Main;
