// export function getCartItems() {
//     return JSON.parse(localStorage.getItem('cartItems')) || [];
// }

// export function getCartItemCount() {
//     return getCartItems.length;
// }

// export function setCartItem(item) {
//     localStorage.setItem('cartItems', JSON.stringify(item));
// }

// export function getItemById(itemId) {
//     const items = getCartItems()
//     return items.find(item => item.id === itemId);
// }

// export function getCartTotalAmount() {
//     const cart = getCartItems();
//     let totalAmount = 0;
//     cart.forEach(item => {
//         totalAmount += item.saleInfo.listPrice.amount * item.qty;
//     })

//     return (totalAmount * 100) / 100;
// }

// export function addItemToCart(item) {
//     const cart = getCartItems();
    // const itemExists = existingCart.some(cartItem => (cartItem.id === item.id));

    // if (!itemExists && !(item.saleInfo.listPrice.amount === 0)) {
    //     const updatedCart = [...existingCart, item];
    //     item.qty += 1;
    //     setCartItem(updatedCart);
    // }     
// }
