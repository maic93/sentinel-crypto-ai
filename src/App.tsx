import React, { useState } from 'react';
import { Eye, Shield } from 'lucide-react';
import { PriceChart } from './components/PriceChart';
import { WhaleTracker } from './components/WhaleTracker';
import { SentimentEngine } from './components/SentimentEngine';
import { MarketController } from './components/MarketController';

function App() {
  const [marketEvent, setMarketEvent] = useState<string | null>(null);

  const handleTriggerEvent = (eventName: string) => {
    if (eventName === 'reset') {
      setMarketEvent(null);
    } else {
      setMarketEvent(eventName);
    }
  };

  return (
    <div className="container">
      <header className="header animate-slide-in">
        <div className="logo-container">
          <Shield className="logo-icon glow-teal" size={32} />
          <div>
            <h1 className="text-2xl font-bold" style={{ letterSpacing: '2px' }}>
              SENTINEL<span className="glow-teal">.AI</span>
            </h1>
            <p className="text-xs muted uppercase" style={{ letterSpacing: '1px' }}>
              Whale Tracker & Sentiment Predictor
            </p>
          </div>
        </div>
        <div className="flex-center gap-4">
          <div className="flex-center gap-2 pill pill-teal animate-pulse-glow">
            <Eye size={14} /> Live AI Analysis Active
          </div>
          <div className="text-sm muted">Network: Mainnet</div>
        </div>
      </header>

      <main className="grid-layout">
        {/* Top Section */}
        <div className="col-span-12 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <MarketController onTriggerEvent={handleTriggerEvent} currentEvent={marketEvent} />
        </div>

        {/* Middle Section */}
        <div className="col-span-8 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <PriceChart marketEvent={marketEvent} />
        </div>

        {/* Right Sidebar - Split into two sections */}
        <div className="col-span-4 flex-col gap-6 animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <div style={{ flex: 1 }}>
            <SentimentEngine marketEvent={marketEvent} />
          </div>
          <div style={{ flex: 1 }}>
            <WhaleTracker marketEvent={marketEvent} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
