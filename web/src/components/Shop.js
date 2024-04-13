import React, {useState, useEffect} from "react";
import "./style.css"
import Item from './Item'

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function Main () {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = async () => {
        try {
            const resp = await fetch(`${BASE_URL}/books`);
            const data = await resp.json();
            setItems(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

    return (
    <div>
    <div className="main-container ">
    <p className="main-title"><b>Book Results</b></p>
    {loading ? (
        <p>Loading...</p>
            ) : (
        <div className="items">
            {items.map((item) => (
                <Item item={item}/>
            ))}
        </div>
        )}
    </div>
    </div>)
}

export default Main;
