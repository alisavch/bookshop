import React, { useContext, useState } from "react"
import Header from "./components/Header"
import Shop from "./components/Shop"
import Cart from "./components/Cart"
import { CartProvider, useCart } from "./context/CartProvider"

function App() {
  const [showCart, setShowCart] = useState(false);

  const appName = 'ScyllaDB Bookshop'

  const { getCartItemCount } = useCart();

  const cartItemCount = getCartItemCount();

  const toggleCart = () => {
    setShowCart(prevShowCart => !prevShowCart);
  };

  return (
    <div className="App">
      {/* <CartProvider> */}
          <Header appName={appName} toggleCart={toggleCart} cartItemsCount={cartItemCount} />
          <main>
          <div className={`main-container ${showCart && cartItemCount > 0 ? 'cart-expanded' : ''}`}>
            <Shop/>
            {showCart && cartItemCount > 0 && <Cart/>}
          </div> 
         </main>
      {/* </CartProvider> */}
    </div>
  );
}

export default () => (
  <CartProvider>
    <App />
  </CartProvider>
);
