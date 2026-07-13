import React from 'react';
import { Sliders, Zap } from 'lucide-react';

interface MarketControllerProps {
  onTriggerEvent: (event: string) => void;
  currentEvent: string | null;
}

export const MarketController: React.FC<MarketControllerProps> = ({ onTriggerEvent, currentEvent }) => {
  const events = [
    { name: 'Whale Dump', type: 'bearish' },
    { name: 'Elon Musk Tweet', type: 'bullish' },
    { name: 'Fed Rate Hike', type: 'bearish' },
    { name: 'ETF Approval', type: 'bullish' },
  ];

  return (
    <div className="glass-panel p-6">
      <h2 className="text-xl font-bold mb-4 flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
        <Sliders className="logo-icon" size={24} />
        Interactive Market Controller
      </h2>
      <p className="text-sm muted mb-6">
        Trigger market events to see how Sentinel's AI recalculates risk, sentiment, and price projections in real-time.
      </p>

      <div className="flex-center gap-4" style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {events.map((evt) => (
          <button
            key={evt.name}
            onClick={() => onTriggerEvent(evt.name)}
            className={`btn flex-center gap-2 ${currentEvent === evt.name ? 'btn-active' : ''}`}
          >
            <Zap size={16} className={evt.type === 'bullish' ? 'glow-green' : 'glow-red'} />
            {evt.name}
          </button>
        ))}
        
        <button
          onClick={() => onTriggerEvent('reset')}
          className="btn"
          style={{ background: 'transparent', borderStyle: 'dashed' }}
        >
          Reset Simulation
        </button>
      </div>
    </div>
  );
};
