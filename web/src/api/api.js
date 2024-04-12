const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const GOOGLE_BOOKS_URL = process.env.REACT_APP_BACKEND_URL;

export async function fetchItems() {
    try {
        const resp = await fetch(`${GOOGLE_BOOKS_URL}/volumes?q=nosql`);
        // const resp = await fetch(`${BASE_URL}/books`);
        if (!resp.ok) {
            throw new Error('Failed to fetch all items')
        }

        const data = await resp.json();
        return data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}

export async function fetchCart() {
    try {
        const resp = await fetch(`${BASE_URL}/cart`);
        if (!resp.ok) {
            throw new Error('Failed to fetch all cart items')
        }

        const data = await resp.json();
        return data;
    } catch (error) {
        console.error('Error fetching items in the cart:', error);
    }
}

export async function getCartAmount() {
    try {
        const resp = await fetch(`${BASE_URL}/cart-amount`);
        if (!resp.ok) {
            throw new Error('Failed to get the amount in the cart')
        }

        const data = await resp.json();
        return data;
    } catch (error) {
        console.error('Error getting cart total:', error);
    }
}

export async function getCartSize() {
    try {
        const resp = await fetch(`${BASE_URL}/cart-size`);
        if (!resp.ok) {
            throw new Error('Failed to get the cart size')
        }

        const data = await resp.json();
        return data;
    } catch (error) {
        console.error('Error getting the cart size:', error);
    }
}

export async function addToCart(sessionId, itemId) {
    try {
        const resp = await fetch(`${BASE_URL}/add-to-cart/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Session-Id': sessionId,
          },
          body: JSON.stringify({ itemId: itemId })
        });
        if (!resp.ok) {
          throw new Error('Failed to add the item to the cart');
        }
      } catch (error) {
        console.error('Error adding the item to the cart:', error);
      }
}

export async function updateCartItem(sessionId, itemId, qty) {
    try {
        const resp = await fetch(`${BASE_URL}/update-cart-item/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Session-Id': sessionId,
          },
          body: JSON.stringify({ itemIs: itemId, qty: qty })
        });
        if (!resp.ok) {
          throw new Error('Failed to update the item in the cart');
        }
      } catch (error) {
        console.error('Error updating the cart item:', error);
      }
}
