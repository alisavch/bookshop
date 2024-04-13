import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { getCartItemCount } from './utils/localStorage';

jest.mock('./utils/localStorage', () => ({
  getCartItemCount: jest.fn(),
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

  test('toggleCart toggles the value of showCart, but there are no items', () => {
    const { container } = render(<App />);
    const button = container.querySelector('button');

    fireEvent.click(button);
    expect(container.querySelector('.cart-expanded')).toBeNull();
  });

  test('cart is not rendered when showCart is false', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.Cart')).not.toBeInTheDocument();
  });

  test('header receives correct props', () => {
    getCartItemCount.mockReturnValue(2);

    const { getByText } = render(<App />);
    expect(getByText('ScyllaDB Bookshop')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
  });
});
