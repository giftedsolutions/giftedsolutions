import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types';

// Mock the cart store
const mockAddItem = jest.fn();
jest.mock('@/store/cart', () => ({
  useCartStore: () => ({
    addItem: mockAddItem,
  }),
}));

const mockProduct: Product = {
  id: '1',
  name: 'Arduino Uno + USB Cable',
  category: 'A. DEVELOPMENT BOARDS',
  price: 750,
  unit: 'each',
  description: 'Arduino Uno development board with USB cable',
  image_url: 'https://example.com/arduino-uno.jpg',
  is_active: true,
  stock_quantity: 10,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('ProductCard Component', () => {
  beforeEach(() => {
    mockAddItem.mockClear();
  });

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Arduino Uno + USB Cable')).toBeInTheDocument();
    expect(screen.getByText('K750.00')).toBeInTheDocument();
  });

  it('displays product image', () => {
    render(<ProductCard product={mockProduct} />);
    
    const images = screen.getAllByAltText('Arduino Uno + USB Cable');
    expect(images.length).toBeGreaterThan(0);
  });

  it('calls addItem when Add button is clicked', () => {
    render(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /add arduino uno/i });
    fireEvent.click(addButton);
    
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });

  it('opens modal when product image is clicked', () => {
    render(<ProductCard product={mockProduct} />);
    
    // Find the first button (image button)
    const imageButton = screen.getAllByRole('button')[0];
    fireEvent.click(imageButton);
    
    // Modal should be in the document (checking for modal content)
    expect(screen.getByText(/specifications/i)).toBeInTheDocument();
  });
});

