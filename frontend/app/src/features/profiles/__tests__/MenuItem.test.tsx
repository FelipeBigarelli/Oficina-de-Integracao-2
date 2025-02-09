import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import MenuItem from '../components/MenuItem'; // Adjust the import path if needed

describe('MenuItem Component', () => {
  it('renders title and icon correctly', () => {
    render(<MenuItem title="Test Item" icon={<svg />} onClick={() => {}} />);

    expect(screen.getByText('Test Item')).not.toBeNull();
    // Assuming you're using an <svg> tag for the icon, check its presence within the button
    expect(screen.getByRole('button')).toHaveProperty('innerHTML', expect.stringContaining('<svg'));
  });

  it('applies active class when isActive is true', () => {
    render(<MenuItem title="Active Item" icon={<svg />} isActive={true} onClick={() => {}} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveProperty('className', expect.stringContaining('bg-gray-700 text-white'));
  });

  it('does not apply active class when isActive is false', () => {
    render(<MenuItem title="Inactive Item" icon={<svg />} isActive={false} onClick={() => {}} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveProperty('className', expect.not.stringContaining('bg-gray-700 text-white'));
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<MenuItem title="Clickable Item" icon={<svg />} onClick={onClickMock} />);

    screen.getByRole('button').click();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});