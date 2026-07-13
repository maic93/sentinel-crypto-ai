import React, { useEffect, useState } from 'react';
import { Activity, MessageSquare } from 'lucide-react';

interface SentimentEngineProps {
  marketEvent: string | null;
}

interface NewsItem {
  id: string;
  source: string;
  headline: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  time: string;
}

const generateRandomId = () => Math.random().toString(36).substring(2, 9);

export const SentimentEngine: React.FC<SentimentEngineProps> = ({ marketEvent }) => {
  const [gaugeValue, setGaugeValue] = useState(55); // 0 = Extreme Fear, 100 = Extreme Greed
  const [news, setNews] = useState<NewsItem[]>([
    { id: '1', source: 'Twitter/X', headline: 'Analysts predict breakout for SOL', sentiment: 'Bullish', time: '10m ago' },
    { id: '2', source: 'Reddit', headline: 'Is the bull market over? Macro worries persist.', sentiment: 'Bearish', time: '25m ago' },
    { id: '3', source: 'News', headline: 'Bitcoin dominance stabilizes around 52%', sentiment: 'Neutral', time: '1h ago' },
  ]);

  useEffect(() => {
    if (!marketEvent) return;

    let newNewsItem: NewsItem | null = null;
    let newGaugeValue = gaugeValue;

    if (marketEvent === 'Whale Dump') {
      newNewsItem = {
        id: generateRandomId(),
        source: 'On-Chain Alert',
        headline: 'Massive BTC transfer to exchanges sparks sell-off fears',
        sentiment: 'Bearish',
        time: 'Just now',
      };
      newGaugeValue = 25; // Fear
    } else if (marketEvent === 'Elon Musk Tweet') {
      newNewsItem = {
        id: generateRandomId(),
        source: 'Twitter/X',
        headline: 'Elon Musk posts picture of doge on moon',
        sentiment: 'Bullish',
        time: 'Just now',
      };
      newGaugeValue = 85; // Greed
    } else if (marketEvent === 'Fed Rate Hike') {
      newNewsItem = {
        id: generateRandomId(),
        source: 'Macro News',
        headline: 'Fed announces unexpected 50bps rate hike',
        sentiment: 'Bearish',
        time: 'Just now',
      };
      newGaugeValue = 15; // Extreme Fear
    } else if (marketEvent === 'ETF Approval') {
      newNewsItem = {
        id: generateRandomId(),
        source: 'Mainstream Media',
        headline: 'SEC officially approves spot Bitcoin ETFs',
        sentiment: 'Bullish',
        time: 'Just now',
      };
      newGaugeValue = 95; // Extreme Greed
    }

    if (newNewsItem) {
      setNews((prev) => [newNewsItem!, ...prev].slice(0, 4));
      setGaugeValue(newGaugeValue);
    }
  }, [marketEvent]);

  // Determine gauge color and text
  let gaugeColor = 'var(--neon-green)';
  let gaugeText = 'Greed';
  if (gaugeValue < 30) {
    gaugeColor = 'var(--neon-red)';
    gaugeText = 'Extreme Fear';
  } else if (gaugeValue < 45) {
    gaugeColor = 'var(--neon-red)';
    gaugeText = 'Fear';
  } else if (gaugeValue < 55) {
    gaugeColor = '#94a3b8';
    gaugeText = 'Neutral';
  } else if (gaugeValue > 75) {
    gaugeColor = 'var(--neon-green)';
    gaugeText = 'Extreme Greed';
  }

  return (
    <div className="glass-panel p-6 h-full flex-col">
      <h2 className="text-xl font-bold mb-4 flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
        <Activity className="logo-icon" size={24} />
        Social Sentiment Engine
      </h2>

      <div className="flex-center mb-6 mt-2" style={{ flexDirection: 'column' }}>
        <div 
          className="flex-center animate-pulse-glow"
          style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            border: `4px solid ${gaugeColor}`,
            boxShadow: `0 0 20px ${gaugeColor}40`,
            background: 'rgba(0,0,0,0.2)'
          }}
        >
          <div className="flex-col flex-center">
            <span className="text-2xl font-bold" style={{ color: gaugeColor }}>{gaugeValue}</span>
            <span className="text-xs uppercase muted mt-1">{gaugeText}</span>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-medium muted mb-3 uppercase tracking-wider flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
        <MessageSquare size={14} /> Live Social Stream
      </h3>
      
      <div className="flex-col gap-3">
        {news.map((item) => (
          <div key={item.id} className="p-3" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `3px solid ${item.sentiment === 'Bullish' ? 'var(--neon-green)' : item.sentiment === 'Bearish' ? 'var(--neon-red)' : '#94a3b8'}` }}>
            <div className="flex-between mb-1">
              <span className="text-xs font-bold" style={{ color: 'var(--neon-teal)' }}>{item.source}</span>
              <span className="text-xs muted">{item.time}</span>
            </div>
            <p className="text-sm">{item.headline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
