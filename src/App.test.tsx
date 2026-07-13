import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock chart.js to prevent canvas errors in jsdom
vi.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="mock-line-chart"></div>,
}));

describe('Sentinel Application', () => {
  it('updates state when a Market Controller button is clicked', () => {
    render(<App />);
    
    // Find the Whale Dump button and click it
    const whaleDumpBtn = screen.getByText(/Whale Dump/i);
    fireEvent.click(whaleDumpBtn);
    
    // Verify it updates state by checking if the specific news for Whale Dump appears
    expect(screen.getByText(/Massive BTC transfer to exchanges sparks sell-off fears/i)).toBeInTheDocument();
  });

  it('mounts Sentiment Engine and updates fear/greed gauge correctly', () => {
    render(<App />);
    
    // Default is 55 (Neutral)
    expect(screen.getByText('55')).toBeInTheDocument();
    expect(screen.getByText(/Neutral/i)).toBeInTheDocument();
    
    // Click Elon Musk Tweet
    const elonBtn = screen.getByText(/Elon Musk Tweet/i);
    fireEvent.click(elonBtn);
    
    // Verify gauge updates to 85 (Extreme Greed)
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText(/Extreme Greed/i)).toBeInTheDocument();
  });
});
