import React from "react";
import "./style.css"

function Header ({ appName, toggleCart, cartItemsCount }) {
    return (
    <div className="header">
        <div className="app-name">{appName}</div>
        <div className="header-cart">
            <button onClick={toggleCart}>My Cart <span id="cartTotal">{cartItemsCount > 0 ? <>({cartItemsCount})</> : null}</span></button>
        </div>
    </div>
    )
}

export default Header;
