import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header';

// Mock the cart store
jest.mock('@/store/cart', () => ({
  useCartStore: () => ({
    getItemCount: jest.fn(() => 3),
  }),
}));

describe('Header Component', () => {
  it('renders the header with business name', () => {
    render(<Header />);
    
    expect(screen.getByText(/Gifted Solutions Inventory/i)).toBeInTheDocument();
    expect(screen.getByText(/Bringing Ideas to Life/i)).toBeInTheDocument();
  });

  it('displays cart item count', () => {
    render(<Header />);
    
    const cartButton = screen.getByLabelText(/open shopping cart/i);
    expect(cartButton).toBeInTheDocument();
    
    // Check for cart count badge
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders cart button', () => {
    render(<Header />);
    
    const cartButton = screen.getByRole('button', { name: /open shopping cart/i });
    expect(cartButton).toBeInTheDocument();
  });
});

