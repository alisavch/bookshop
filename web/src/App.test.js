import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./context/CartProvider', () => ({
  useCart: () => ({
    getCartItemCount: jest.fn().mockReturnValue(2),
  }),
}));

describe('App component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('initial state of showCart is false', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.main-container')).not.toHaveClass('cart-expanded');
  });

  test('renders header with correct cart item count', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Cart \(2\)/i)).toBeInTheDocument();
  });

  // test('toggleCart toggles the value of showCart, but there are no items', () => {
  //   const { container } = render(<App />);
  //   const button = container.querySelector('button');

  //   fireEvent.click(button);
  //   expect(container.querySelector('.cart-expanded')).toBeNull();
  // });

  // test('cart is not rendered when showCart is false', () => {
  //   const { container } = render(<App />);
  //   expect(container.querySelector('.Cart')).not.toBeInTheDocument();
  // });

  // test('header receives correct props', () => {
  //   getCartItemCount.mockReturnValue(2);

  //   const { getByText } = render(<App />);
  //   expect(getByText('ScyllaDB Bookshop')).toBeInTheDocument();
  //   expect(getByText('2')).toBeInTheDocument();
  // });
});

describe('getCartItemCount', () => {
  // beforeEach(() => {
  //   localStorage.clear();
  // });

  // test('should return correct number of items in cart', () => {
  //   localStorage.setItem('cartItems', JSON.stringify([{ id: 1 }, { id: 2 }]));
  //   expect(getCartItemCount()).toBe(2);
  // });

  // test('should return 0 when cart is empty', () => {
  //   expect(getCartItemCount()).toBe(0);
  // });
});
