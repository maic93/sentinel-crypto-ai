import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  marketEvent: string | null;
}

export const PriceChart: React.FC<PriceChartProps> = ({ marketEvent }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#f8fafc',
          font: {
            family: "'Outfit', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(16, 24, 40, 0.9)',
        titleColor: '#00f0ff',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
    },
  };

  const labels = ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30'];

  const data = useMemo(() => {
    let btcBase = [64000, 64200, 63800, 64500, 64100, 64800, 65000];
    let ethBase = [3400, 3420, 3380, 3450, 3410, 3480, 3500];
    let solBase = [140, 142, 138, 145, 141, 148, 150];
    let aiTrendBase = [64000, 64300, 64100, 64800, 64400, 65100, 65500];

    if (marketEvent === 'Whale Dump') {
      btcBase = [64000, 64200, 63800, 61000, 59500, 58000, 57500];
      ethBase = [3400, 3420, 3380, 3200, 3050, 2900, 2850];
      solBase = [140, 142, 138, 125, 115, 105, 100];
      aiTrendBase = [64000, 64300, 64100, 60500, 59000, 57500, 57000];
    } else if (marketEvent === 'Elon Musk Tweet') {
      btcBase = [64000, 64200, 63800, 65500, 67000, 68500, 69000];
      // Doge would pump more, but we plot BTC, ETH, SOL
      ethBase = [3400, 3420, 3380, 3500, 3600, 3700, 3750];
      solBase = [140, 142, 138, 145, 150, 155, 160];
      aiTrendBase = [64000, 64300, 64100, 66000, 67500, 69000, 69500];
    } else if (marketEvent === 'Fed Rate Hike') {
      btcBase = [64000, 64200, 63800, 63000, 62000, 61500, 61000];
      ethBase = [3400, 3420, 3380, 3300, 3200, 3150, 3100];
      solBase = [140, 142, 138, 135, 130, 128, 125];
      aiTrendBase = [64000, 64300, 64100, 62500, 61500, 61000, 60500];
    } else if (marketEvent === 'ETF Approval') {
      btcBase = [64000, 64200, 63800, 68000, 72000, 75000, 76000];
      ethBase = [3400, 3420, 3380, 3600, 3800, 4000, 4100];
      solBase = [140, 142, 138, 150, 160, 170, 175];
      aiTrendBase = [64000, 64300, 64100, 68500, 73000, 76000, 77000];
    }

    // Normalize visually for chart if needed, but ChartJS handles multiple axes or just let them scale.
    // Actually, ETH and SOL are too small compared to BTC to see on same axis without multi-axis. 
    // Let's just use BTC for simplicity, and maybe show % change.
    // To keep it simple but fulfill requirements, we'll plot them, but they might be squashed. 
    // Better to use two y-axes or just let it be (BTC dominates visually).
    // Let's add multiple axes.
    return {
      labels,
      datasets: [
        {
          label: 'BTC Price',
          data: btcBase,
          borderColor: '#ff9900',
          backgroundColor: 'rgba(255, 153, 0, 0.1)',
          tension: 0.4,
          yAxisID: 'y',
        },
        {
          label: 'ETH Price',
          data: ethBase,
          borderColor: '#627eea',
          backgroundColor: 'rgba(98, 126, 234, 0.1)',
          tension: 0.4,
          yAxisID: 'y1',
        },
        {
          label: 'SOL Price',
          data: solBase,
          borderColor: '#14F195',
          backgroundColor: 'rgba(20, 241, 149, 0.1)',
          tension: 0.4,
          yAxisID: 'y1',
        },
        {
          label: 'AI Projected Trend (BTC)',
          data: aiTrendBase,
          borderColor: '#00f0ff',
          borderDash: [5, 5],
          tension: 0.4,
          yAxisID: 'y',
          pointRadius: 0,
          borderWidth: 3,
        },
      ],
    };
  }, [marketEvent]);

  // Adjust options to have multiple axes
  const optionsWithAxes = {
    ...options,
    scales: {
      x: options.scales.x,
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#ff9900' },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { color: '#627eea' },
      },
    },
  };

  return (
    <div className="glass-panel p-6 flex-col" style={{ height: '400px' }}>
      <h2 className="text-xl font-bold mb-4 flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
        <span className="glow-teal">Live Price Action</span> & AI Projection
      </h2>
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <Line options={optionsWithAxes as any} data={data} />
      </div>
    </div>
  );
};
