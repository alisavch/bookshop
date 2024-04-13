import React, {useState, useEffect} from "react";
import "./style.css"
import { addItemToCart, updateCartItemQty, removeCartItem, getCartItemCount } from '../utils/localStorage';

function Item ({item, inCart}) {
    const [quantity, setQuantity] = useState(item.qty || 1);

    const action = inCart ? 'X' : 'Add To Cart'

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);

    const handleRemoveItem = (itemId) => {
        removeCartItem(itemId);

        document.getElementById('cartTotal').innerText = getCartItemCount()
    };

    const handlerAddToCartItem = (item) => {
        addItemToCart(item);

        document.getElementById('cartTotal').innerText = getCartItemCount()
    }
 
    return (
    <div className="item">
        {
            inCart ? (
                <>
                <div className="item-in-cart">
                <button className="removeFromCartBttn" onClick={() => handleRemoveItem(item.id)}>{action}</button>
                <p className="item-title"><b>{item.title}</b></p>
                < input
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
                <button onClick={() => updateCartItemQty(item.id, quantity) }>Update Quantity</button>        
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
                <button className="addToCartBttn" onClick={() => handlerAddToCartItem(item) }>{action}</button>
                </div>
                </>
            )
        }
    </div>
    )
}

export default Item;
