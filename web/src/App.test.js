import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

  test('renders header with correct cart item count', async () => {
    const { getByTestId } = render(<App />);
    const cartItemCountElement = await waitFor(() => getByTestId('cart-item-count'));
    expect(cartItemCountElement.textContent).toEqual("My Cart 2");
  });

  test('cart is not rendered when showCart is false', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.Cart')).not.toBeInTheDocument();
  });

  test('header receives correct props', () => {
    const { getByText } = render(<App />);
    expect(getByText('ScyllaDB Bookshop')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
  });
});
