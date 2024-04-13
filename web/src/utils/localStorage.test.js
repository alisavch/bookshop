import {
    addItemToCart,
    getCartItemCount,
    getCartItems,
    getCartTotalAmount,
    updateCartItemQty,
    removeCartItem
  } from './localStorage';
  
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  };
  
  global.localStorage = localStorageMock;

  describe('addItemToCart', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    test('should not add item to cart when item already exists', () => {
      const item = { id: 1, saleInfo: { listPrice: { amount: 10 } }, qty: 1 };
      addItemToCart(item);
      addItemToCart(item);
      expect(getCartItems().length).toBe(1);
    });
  
    test('should add item to cart when item does not exist and has price more than 0', () => {
      const item = { id: 1, saleInfo: { listPrice: { amount: 10 } }, qty: 0 };
      addItemToCart(item);
      expect(getCartItems()).toContainEqual(item);
    });
  
    test('should not add item to cart when item has a zero list price', () => {
      const item = { id: 1, saleInfo: { listPrice: { amount: 0 } }, qty: 0 };
      addItemToCart(item);
      expect(getCartItems().length).toBe(0);
    });
  });
  
  describe('getCartItemCount', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    test('should return correct number of items in cart', () => {
      localStorage.setItem('cartItems', JSON.stringify([{ id: 1 }, { id: 2 }]));
      expect(getCartItemCount()).toBe(2);
    });
  
    test('should return 0 when cart is empty', () => {
      expect(getCartItemCount()).toBe(0);
    });
  });

  describe('getCartItems', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    
    test('should return items from local storage', () => {
      localStorage.setItem('cartItems', JSON.stringify([{ id: 1 }, { id: 2 }]));
      expect(getCartItems().length).toBe(2);
    });
  });

  describe('getCartTotalAmount', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    
    test('should return items from local storage', () => {
      localStorage.setItem('cartItems', JSON.stringify([
        { id: 1, saleInfo: { listPrice: { amount: 10, currencyCode: "PLN" } }, qty: 1 }, 
        { id: 2, saleInfo: { listPrice: { amount: 10, currencyCode: "PLN" } }, qty: 2 },
      ]));
      expect(getCartTotalAmount()).toEqual(30);
    });
  });

  describe('updateCartItemQty', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    
    test('should update 1 qty to 4', () => {
      localStorage.setItem('cartItems', JSON.stringify([
        { id: 1, saleInfo: { listPrice: { amount: 10, currencyCode: "PLN" } }, qty: 1 }, 
      ]));

      updateCartItemQty(1, 4)
      const items = getCartItems()
      const updatedItem = items.find(item => item.id === 1);
      expect(updatedItem.qty).toBe(4);
    });
  });

  describe('removeCartItem', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    
    test('should remove item from cart', () => {
      localStorage.setItem('cartItems', JSON.stringify([
        { id: 1, saleInfo: { listPrice: { amount: 10, currencyCode: "PLN" } }, qty: 1 }, 
      ]));

      removeCartItem(1)
      const items = getCartItems()
      expect(getCartItems().length).toBe(0);
    });
  });
    