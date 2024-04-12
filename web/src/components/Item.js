import React, {useState} from "react";
import "./style.css"

function Item ({item, addToCart, inCart, updateInCart}) {
    const [quantity, setQuantity] = useState(item.quantity || 1);

    const action = inCart ? 'X' : 'Add To Cart'
    const handleAction = inCart ? updateInCart : addToCart;

    const handleUpdateInCart = () => {
        updateInCart(item.id, quantity);
      };

    console.log(item.saleInfo.listPrice)

    return (
    <div className="item">
        {
            inCart ? (
                <>
                <div className="item-in-cart">
                <button className="removeFromCartBttn" onClick={() => handleAction(item.id)}>{action}</button>
                <p className="item-title"><b>{item.volumeInfo.title}</b></p>
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
                <button onClick={handleUpdateInCart}>Update Quantity</button>        
                {isNaN(quantity) || quantity < 1 || quantity > 100 ? (
                    <p className="error-message">Sorry! Number invalid</p>
                ) : null}
                </div>
                </>
            ) : (
                <>
                <img class="item-image" src={item.volumeInfo.imageLinks.smallThumbnail} alt="" />
                <div className="item-content">
                <p><b>{item.volumeInfo.title}</b></p>
                <p>{item.volumeInfo.description}</p>
                <p>Pages: {item.volumeInfo.pageCount}</p>
                <button className="addToCartBttn" onClick={() => handleAction(item.id)}>{action}</button>
                </div>
                </>
            )
        }
         
    </div>
    )
}

export default Item;