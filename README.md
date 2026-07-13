# Sentinel - AI Crypto Whale Tracker & Market Sentiment Predictor

Sentinel is a premium, responsive web application designed to track crypto whale movements, predict market sentiment using AI, and provide a comprehensive dashboard for traders and enthusiasts.

## Core Features
- **Interactive Price Chart**: Real-time visual representation of BTC, ETH, and SOL prices, integrated with an AI Projected Trend line.
- **Simulated Whale Tracker Feed**: A live feed of major wallet transfers, tagged with AI risk and accumulation analysis.
- **Social Sentiment Engine**: A continuous stream of mock social news combined with a live Fear & Greed gauge.
- **Interactive Market Controller**: A testing suite allowing you to trigger major market events (e.g., "Elon Musk Tweet", "Whale Dump", "Fed Rate Hike") to see how the system reacts in real-time.

## Tech Stack
- React 18 + TypeScript + Vite
- Vanilla CSS with Glassmorphism and modern Dark Mode styling
- Chart.js & React-Chartjs-2 for high-performance interactive charts

## Setup & Installation

1. Ensure you have Node.js installed.
2. Clone this repository or open the project folder.
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application Locally

Start the Vite development server by running:
```bash
npm run dev
```

Navigate to `http://localhost:5173` (or the URL provided in your terminal) to view the Sentinel dashboard.

## Running with Docker

You can also run Sentinel using Docker and Docker Compose. This utilizes a multi-stage build serving static files via Nginx.

1. Ensure you have Docker and Docker Compose installed.
2. Build and start the container by running:
   ```bash
   docker-compose up -d --build
   ```
3. Navigate to `http://localhost:3000` in your browser.

To stop the container, run:
```bash
docker-compose down
```

## Design Philosophy
Sentinel uses a curated dark-mode theme featuring:
- Custom dark blues and neon teals for a cyberpunk aesthetic.
- Glassmorphism effects for a modern, layered look.
- Smooth orbital/glow animations that respond to data updates and user interactions.
- Crisp typography leveraging modern sans-serif fonts (Inter/Outfit).

## Legal
*Sentinel is a mock application for demonstration purposes. It does not provide real financial advice or real-time data.*
