import React, { useEffect, useState, useRef } from 'react';
import { Briefcase, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface PortfolioProps {
  marketEvent: string | null;
}

interface Asset {
  symbol: string;
  name: string;
  amount: number;
  priceUsd: number;
  pnl24h: number; // percentage
}

// Impact map: how each market event shifts the portfolio value
const EVENT_IMPACTS: Record<string, number> = {
  'Whale Dump':      -0.12,  // -12%
  'Elon Musk Tweet':  0.18,  //  +18%
  'Fed Rate Hike':   -0.15,  // -15%
  'ETF Approval':     0.22,  //  +22%
};

function calcNetWorth(assets: Asset[]): number {
  return assets.reduce((sum, a) => sum + a.amount * a.priceUsd, 0);
}

const INITIAL_ASSETS: Asset[] = [
  { symbol: 'BTC', name: 'Bitcoin',   amount: 0.1,  priceUsd: 65_000, pnl24h:  2.34 },
  { symbol: 'ETH', name: 'Ethereum',  amount: 2.0,  priceUsd: 3_200,  pnl24h: -0.87 },
  { symbol: 'SOL', name: 'Solana',    amount: 10.0, priceUsd: 175,    pnl24h:  4.12 },
  { symbol: 'BNB', name: 'BNB Chain', amount: 1.5,  priceUsd: 580,    pnl24h:  1.05 },
];

// Derived from actual asset values — keeps constant in sync with INITIAL_ASSETS
const INITIAL_NET_WORTH = calcNetWorth(INITIAL_ASSETS);


function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export const Portfolio: React.FC<PortfolioProps> = ({ marketEvent }) => {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [netWorth, setNetWorth] = useState(INITIAL_NET_WORTH);
  const [flash, setFlash] = useState<'positive' | 'negative' | null>(null);
  const prevEvent = useRef<string | null>(null);

  useEffect(() => {
    if (!marketEvent || marketEvent === prevEvent.current) return;
    prevEvent.current = marketEvent;

    const impact = EVENT_IMPACTS[marketEvent];
    if (impact === undefined) return;

    const direction = impact > 0 ? 'positive' : 'negative';
    setFlash(direction);
    setTimeout(() => setFlash(null), 1200);

    setAssets((prev) =>
      prev.map((asset) => ({
        ...asset,
        priceUsd: asset.priceUsd * (1 + impact),
        pnl24h: +(asset.pnl24h + impact * 100 * 0.5).toFixed(2),
      }))
    );
  }, [marketEvent]);

  // Reset when event is cleared
  useEffect(() => {
    if (marketEvent === null) {
      prevEvent.current = null;
      setAssets(INITIAL_ASSETS);
      setNetWorth(INITIAL_NET_WORTH);
    }
  }, [marketEvent]);

  // Derive net worth from asset prices
  useEffect(() => {
    setNetWorth(calcNetWorth(assets));
  }, [assets]);

  const overallPnl = netWorth - INITIAL_NET_WORTH;
  const overallPct = ((overallPnl / INITIAL_NET_WORTH) * 100).toFixed(2);
  const isPositive = overallPnl >= 0;

  return (
    <div
      className={`glass-panel p-6 portfolio-panel${flash ? ` portfolio-flash-${flash}` : ''}`}
      data-testid="portfolio-panel"
    >
      {/* Header */}
      <h2
        className="text-xl font-bold mb-4 flex-center gap-2"
        style={{ justifyContent: 'flex-start' }}
      >
        <Briefcase className="logo-icon" size={24} />
        Mock Portfolio Simulator
      </h2>

      {/* Net Worth Banner */}
      <div className="portfolio-net-worth mb-6">
        <div className="flex-between">
          <div>
            <p className="text-xs muted uppercase" style={{ letterSpacing: '1px', marginBottom: '4px' }}>
              Total Net Worth
            </p>
            <p
              className="portfolio-value"
              data-testid="portfolio-net-worth"
              aria-label={`Total net worth: ${formatCurrency(netWorth)}`}
            >
              {formatCurrency(netWorth)}
            </p>
          </div>
          <div className={`portfolio-pnl-badge ${isPositive ? 'pnl-positive' : 'pnl-negative'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{isPositive ? '+' : ''}{overallPct}%</span>
            <span className="pnl-abs">{isPositive ? '+' : ''}{formatCurrency(overallPnl)}</span>
          </div>
        </div>

        {/* Net Worth Bar */}
        <div className="portfolio-bar-track mt-2">
          <div
            className={`portfolio-bar-fill ${isPositive ? 'bar-positive' : 'bar-negative'}`}
            style={{ width: `${Math.min(100, Math.abs(parseFloat(overallPct)) * 2 + 50)}%` }}
          />
        </div>
      </div>

      {/* Asset List */}
      <h3
        className="text-sm font-medium muted uppercase mb-3 flex-center gap-2"
        style={{ justifyContent: 'flex-start', letterSpacing: '1px' }}
      >
        <DollarSign size={14} />
        Holdings
      </h3>

      <div className="portfolio-assets">
        {assets.map((asset) => {
          const value = asset.amount * asset.priceUsd;
          const assetPositive = asset.pnl24h >= 0;
          return (
            <div key={asset.symbol} className="portfolio-asset-row">
              <div className="asset-symbol-block">
                <span className="asset-symbol">{asset.symbol}</span>
                <span className="text-xs muted">{asset.name}</span>
              </div>

              <div className="asset-amount-block text-xs muted">
                {asset.amount} {asset.symbol}
              </div>

              <div className="asset-value-block">
                <span className="asset-value">{formatCurrency(value)}</span>
                <span
                  className={`asset-pnl text-xs ${assetPositive ? 'glow-green' : 'glow-red'}`}
                >
                  {assetPositive ? '▲' : '▼'} {Math.abs(asset.pnl24h).toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-xs muted mt-4" style={{ textAlign: 'center', opacity: 0.5 }}>
        Simulated portfolio — trigger a market event to see live impact
      </p>
    </div>
  );
};
