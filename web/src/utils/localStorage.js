export function addItemToCart(item) {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemExists = existingCart.some(cartItem => (cartItem.id === item.id));

    if (!itemExists && !(item.saleInfo.listPrice.amount === 0)) {
        const updatedCart = [...existingCart, item];
        item.qty += 1;
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }     
}

export function getCartItemCount() {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cart.length;
}

export function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

export function getCartTotalAmount() {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalAmount = 0;
    let currency = '';
    cart.forEach(item => {
        totalAmount += (item.saleInfo.listPrice.amount * 100) * item.qty / 100;
    })
    return totalAmount
}

export function updateCartItemQty(itemId, qty) {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex]["qty"] = qty;
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

export function removeCartItem(itemId) {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
}
