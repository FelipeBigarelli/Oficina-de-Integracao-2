import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

describe('Sidebar Component', () => {
  const mockMenuItems = [
    { title: 'Item 1', icon: <svg />, path: '/item1' },
    { title: 'Item 2', icon: <svg />, path: '/item2', isActive: true },
  ];
  const mockOnNavigate = jest.fn();

  it('renders the title and menu items', () => {
    render(<Sidebar menuItems={mockMenuItems} onNavigate={mockOnNavigate} />);

    expect(screen.getByText('ELLP')).not.toBeNull();
    expect(screen.getByText('Item 1')).not.toBeNull();
    expect(screen.getByText('Item 2')).not.toBeNull();
  });

  it('highlights the active menu item', () => {
    render(<Sidebar menuItems={mockMenuItems} onNavigate={mockOnNavigate} />);

    const activeItem = screen.getByText('Item 2').closest('button');
    expect(activeItem).toHaveProperty('className', expect.stringContaining('bg-gray-700 text-white'));
  });

  it('calls onNavigate with the correct path when an item is clicked', () => {
    render(<Sidebar menuItems={mockMenuItems} onNavigate={mockOnNavigate} />);

    const item1 = screen.getByText('Item 1').closest('button');
    item1?.click();
    expect(mockOnNavigate).toHaveBeenCalledWith('/item1');
  });

  it('calls logout function when logout button is clicked', () => {
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
        assign: jest.fn(),
      },
      writable: true,
    });

    render(<Sidebar menuItems={mockMenuItems} onNavigate={mockOnNavigate} />);

    screen.getByText('Logout').closest('button')?.click();

    expect(window.location.href).toBe('/auth');
  });
});