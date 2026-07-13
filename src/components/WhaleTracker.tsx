import React, { useEffect, useState } from 'react';
import { ArrowRightLeft, AlertTriangle, TrendingUp, ShieldAlert } from 'lucide-react';

interface WhaleTrackerProps {
  marketEvent: string | null;
}

interface Transfer {
  id: string;
  asset: string;
  amount: string;
  from: string;
  to: string;
  type: 'Accumulation' | 'Sell Risk' | 'DeFi Staking' | 'Exchange Transfer';
  time: string;
}

const generateRandomId = () => Math.random().toString(36).substring(2, 9);

export const WhaleTracker: React.FC<WhaleTrackerProps> = ({ marketEvent }) => {
  const [transfers, setTransfers] = useState<Transfer[]>([
    { id: '1', asset: 'BTC', amount: '1,250', from: 'Unknown Wallet', to: 'Binance', type: 'Sell Risk', time: 'Just now' },
    { id: '2', asset: 'ETH', amount: '15,000', from: 'Coinbase', to: 'Unknown Wallet', type: 'Accumulation', time: '2m ago' },
    { id: '3', asset: 'SOL', amount: '250,000', from: 'Unknown Wallet', to: 'Lido', type: 'DeFi Staking', time: '5m ago' },
  ]);

  useEffect(() => {
    if (!marketEvent) return;

    let newTransfer: Transfer | null = null;

    if (marketEvent === 'Whale Dump') {
      newTransfer = {
        id: generateRandomId(),
        asset: 'BTC',
        amount: '8,500',
        from: 'Unknown Wallet',
        to: 'Kraken',
        type: 'Sell Risk',
        time: 'Just now',
      };
    } else if (marketEvent === 'Elon Musk Tweet') {
      newTransfer = {
        id: generateRandomId(),
        asset: 'DOGE',
        amount: '420,000,000',
        from: 'Binance',
        to: 'Unknown Wallet',
        type: 'Accumulation',
        time: 'Just now',
      };
    } else if (marketEvent === 'Fed Rate Hike') {
      newTransfer = {
        id: generateRandomId(),
        asset: 'USDC',
        amount: '50,000,000',
        from: 'Unknown Wallet',
        to: 'Coinbase',
        type: 'Exchange Transfer',
        time: 'Just now',
      };
    } else if (marketEvent === 'ETF Approval') {
      newTransfer = {
        id: generateRandomId(),
        asset: 'BTC',
        amount: '12,000',
        from: 'OTC Desk',
        to: 'Institutional Custody',
        type: 'Accumulation',
        time: 'Just now',
      };
    }

    if (newTransfer) {
      setTransfers((prev) => [newTransfer!, ...prev].slice(0, 5));
    }
  }, [marketEvent]);

  return (
    <div className="glass-panel p-6 h-full flex-col">
      <h2 className="text-xl font-bold mb-4 flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
        <ArrowRightLeft className="logo-icon" size={24} />
        Whale Tracker Feed
      </h2>
      
      <div className="flex-col gap-4 mt-2">
        {transfers.map((tx) => (
          <div key={tx.id} className="flex-between p-4" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex-col gap-2">
              <div className="flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
                <span className="font-bold text-lg">{tx.amount} {tx.asset}</span>
                <span className="text-xs muted">{tx.time}</span>
              </div>
              <div className="text-sm muted flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
                <span>{tx.from}</span>
                <ArrowRightLeft size={12} />
                <span>{tx.to}</span>
              </div>
            </div>
            
            <div>
              {tx.type === 'Sell Risk' && <span className="pill pill-red flex-center gap-1"><AlertTriangle size={12} /> {tx.type}</span>}
              {tx.type === 'Accumulation' && <span className="pill pill-green flex-center gap-1"><TrendingUp size={12} /> {tx.type}</span>}
              {tx.type === 'DeFi Staking' && <span className="pill pill-teal flex-center gap-1"><ShieldAlert size={12} /> {tx.type}</span>}
              {tx.type === 'Exchange Transfer' && <span className="pill" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>{tx.type}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
