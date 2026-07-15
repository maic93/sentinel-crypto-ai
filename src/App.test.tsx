import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Portfolio } from './components/Portfolio';

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

describe('Portfolio Component', () => {
  it('mounts and displays the correct starting balance', () => {
    render(<Portfolio marketEvent={null} />);

    // The net worth element should show the formatted initial balance:
    // 0.1 BTC × $65,000 + 2 ETH × $3,200 + 10 SOL × $175 + 1.5 BNB × $580 = $15,520.00
    const netWorthEl = screen.getByTestId('portfolio-net-worth');
    expect(netWorthEl).toBeInTheDocument();
    expect(netWorthEl.textContent).toBe('$15,520.00');
  });

  it('shows all four initial holdings', () => {
    render(<Portfolio marketEvent={null} />);
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText('SOL')).toBeInTheDocument();
    expect(screen.getByText('BNB')).toBeInTheDocument();
  });

  it('reduces net worth on a bearish market event (Whale Dump)', () => {
    const { rerender } = render(<Portfolio marketEvent={null} />);

    const initialText = screen.getByTestId('portfolio-net-worth').textContent ?? '';
    const initialValue = parseFloat(initialText.replace(/[$,]/g, ''));

    rerender(<Portfolio marketEvent="Whale Dump" />);

    const updatedText = screen.getByTestId('portfolio-net-worth').textContent ?? '';
    const updatedValue = parseFloat(updatedText.replace(/[$,]/g, ''));

    expect(updatedValue).toBeLessThan(initialValue);
  });

  it('increases net worth on a bullish market event (Elon Musk Tweet)', () => {
    const { rerender } = render(<Portfolio marketEvent={null} />);

    const initialText = screen.getByTestId('portfolio-net-worth').textContent ?? '';
    const initialValue = parseFloat(initialText.replace(/[$,]/g, ''));

    rerender(<Portfolio marketEvent="Elon Musk Tweet" />);

    const updatedText = screen.getByTestId('portfolio-net-worth').textContent ?? '';
    const updatedValue = parseFloat(updatedText.replace(/[$,]/g, ''));

    expect(updatedValue).toBeGreaterThan(initialValue);
  });
});
