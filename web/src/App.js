import React, { useState, useEffect } from "react"
import './App.css';
import Header from "./components/Header"
import Main from "./components/Main"
import Cart from "./components/Cart"

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const appName = 'ScyllaDB Bookshop'

  const sessionId = () => {
    return localStorage.getItem('sessionId');
  }

  const toggleCart = () => {
    setShowCart(prevShowCart => !prevShowCart);
  };

  useEffect(() => {
    getCartItemCount();
  }, []);

  const getCartItemCount = async () => {
    try {
        const resp = await fetch('');
        if (!resp.ok) {
            throw new Error('Failed to get cart item count')
        }

        const data = await resp.json();
        setCartItemCount(data)
    } catch (error) {
        console.error('Error getting cart item count:', error);
    }
} 

  return (
    <div className="App">
        <Header appName={appName} toggleCart={toggleCart} cartItemCount={cartItemCount} />
        <main>
        <div className={`main-container ${showCart ? 'cart-expanded' : ''}`}>
          <Main sessionId={sessionId} />
          {showCart && <Cart sessionId={sessionId} />}
        </div>
      </main>
    </div>
  );
}

export default App;
