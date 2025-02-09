import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ProfileField } from '../components/ProfileField'; // Adjust the import path if needed

describe('ProfileField Component', () => {
  it('renders label and value correctly', () => {
    render(<ProfileField label="Nome" value="João Silva" />);

    // Check if the label and value are in the document
    expect(screen.getByText('Nome')).not.toBeNull();
    expect(screen.getByText('João Silva')).not.toBeNull();
  });

  it('shows default value when value is not provided', () => {
    render(<ProfileField label="Email" />);

    // Check if the label and default value are in the document
    expect(screen.getByText('Email')).not.toBeNull();
    expect(screen.getByText('Não informado')).not.toBeNull();
  });

  it('applies correct styling', () => {
    const { container } = render(<ProfileField label="Teste" value="Valor" />);

    const dtElement = container.querySelector('dt');
    const ddElement = container.querySelector('dd');

    // Check if the elements have the correct classes
    expect(dtElement).toHaveProperty('className', 'text-sm font-medium text-gray-400');
    expect(ddElement).toHaveProperty('className', 'mt-1 text-lg text-white');
  });
});