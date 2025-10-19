import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header';
import { useCartStore } from '@/store/cart';

// Mock the cart store
jest.mock('@/store/cart');

const mockUseCartStore = useCartStore as jest.MockedFunction<typeof useCartStore>;

describe('Header Component', () => {
  beforeEach(() => {
    mockUseCartStore.mockImplementation((selector: any) => {
      const state = {
        items: [],
        addItem: jest.fn(),
        removeItem: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        getItemCount: () => 3,
        getTotal: () => 0,
      };
      return selector ? selector(state) : state;
    });
  });

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

