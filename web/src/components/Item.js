import React, {useState} from "react";
import "./style.css"
import { useCart } from '../context/CartProvider';

function Item ({item, inCart}) {
    const [quantity, setQuantity] = useState(item.qty || 1);
    const { updateItemQty, removeItem, addItem } = useCart();

    const action = inCart ? 'X' : 'Add To Cart'
 
    return (
    <div className="item">
        {
            inCart ? (
                <>
                <div className="item-in-cart">
                <button className="remove-item" onClick={() => removeItem(item.id)}>{action}</button>
                <p className="item-title"><b>{item.title}</b></p>
                <input
                    className="item-quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 1 && value <= 100) {
                            setQuantity(value);
                        } else {
                            setQuantity(e.target.value);
                        }
                    }}
                />    
                <button onClick={() => updateItemQty(item.id, quantity) }>Update Quantity</button>        
                {isNaN(quantity) || quantity < 1 || quantity > 100 ? (
                    <p className="error-message">Sorry! Number invalid</p>
                ) : null}
                </div>
                </>
            ) : (
                <>
                <img class="item-image" src={item.image} alt="" />
                <div className="item-content">
                <p><b>{item.title}</b></p>
                <p>{item.description}</p>
                <p>Pages: {item.pageCount}</p>
                <p>Price: {item.saleInfo.listPrice.amount} {item.saleInfo.listPrice.currencyCode}</p>
                <button className="add-item" onClick={() => addItem(item) }>{action}</button>
                </div>
                </>
            )
        }
    </div>
    )
}

export default Item;
