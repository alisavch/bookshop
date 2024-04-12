import React from "react";
import "./style.css"

function Header ({ appName, toggleCart, cartItemCount }) {
    return (
    <div className="header">
        <div className="app-name">{appName}</div>
        <div className="header-cart">
            <button onClick={toggleCart}>My Cart ({cartItemCount})</button>
        </div>
    </div>
    )
}

export default Header;
