import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InfoButton from '../../components/InfoButton'; // Adjust the import path as necessary

describe('InfoButton Component', () => {
  const tooltipText = "This is additional information";

  test('renders button with correct text', () => {
    render(<InfoButton text={tooltipText} />);
    
    const button = screen.getByLabelText(/more information/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('i'); // The button shows 'i'
  });

  test('shows tooltip on mouse enter', () => {
    render(<InfoButton text={tooltipText} />);
    
    const button = screen.getByLabelText(/more information/i);
    fireEvent.mouseEnter(button);
    
    const tooltip = screen.getByText(tooltipText);
    expect(tooltip).toBeInTheDocument();
  });

  test('hides tooltip on mouse leave', () => {
    render(<InfoButton text={tooltipText} />);
    
    const button = screen.getByLabelText(/more information/i);
    fireEvent.mouseEnter(button); // Show the tooltip first
    fireEvent.mouseLeave(button); // Then hide it
    
    const tooltip = screen.queryByText(tooltipText);
    expect(tooltip).not.toBeInTheDocument();
  });
});
