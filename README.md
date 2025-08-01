Explore the world through your packets! PacketLens transforms your Wireshark JSON exports into a dynamic, interactive map of your TCP packet journeys. Visualize hops, track latency, and discover the geography of your network traffic.

🚀 Features
Feature	Description
🌍 Global Mapping	Pinpoint each TCP packet hop on an interactive Leaflet map.
🔄 Wireshark JSON Import	Directly ingest JSON exports from Wireshark with one click.
👤 User Accounts	Secure login, dashboard, and history of all your packet captures.
📈 Statistics & Insights	View per-capture metrics: total hops, average latency, geo-distribution.
🎨 Dark Mode & Themes	Built-in light/dark themes for comfortable viewing anytime.
⚡️ Real-Time Preview	Instant visualization as you upload—no waiting required.
📸 Screenshots
<p align="center"> <img src="https://user-images.githubusercontent.com/yourusername/packetlens-map.png" alt="Map View" width="45%"/> <img src="https://user-images.githubusercontent.com/yourusername/packetlens-dashboard.png" alt="Dashboard View" width="45%"/> </p>
🛠️ Tech Stack
Frontend: React · Redux Toolkit · Leaflet · Tailwind CSS

Backend: Node.js · Express · MongoDB · JWT Authentication

Geolocation: MaxMind GeoIP2 or IPstack API

⚙️ Quick Start
bash
# 1. Clone the repo
git clone https://github.com/suvrat007/packetLens.git
cd packetLens

# 2. Install dependencies
npm install

# 3. Copy and configure environment variables
cp .env.example .env
# Edit .env with your secrets:
# PORT, API_URL, JWT_SECRET, GEOIP_API_KEY, MONGO_URI

# 4. Start the app
npm start
Open your browser at http://localhost:3000 and create an account!

📂 Project Structure
text
packetLens/
├── api/                  # Express routes, controllers, and middleware
├── public/               # Static files and HTML template
├── src/
│   ├── components/       # Reusable UI components
│   ├── features/         # Redux slices and async thunks
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Route-based page components
│   └── assets/           # Images, icons, styles
├── .env                  # Environment variables
├── package.json          # Scripts and dependencies
└── tailwind.config.js    # Tailwind CSS configuration
🎯 Usage
Sign Up / Log In

Export from Wireshark:
File → Export Packet Dissections → as JSON

Upload your .json file on PacketLens.

Visualize packet hops, zoom to regions, and inspect latencies.

Analyze past captures in your personal dashboard.

🤝 Contributing
We welcome contributions! Please:

Fork the repository

Create a branch: git checkout -b feature/awesome

Commit your changes: git commit -m "Add awesome feature"

Push to your fork: git push origin feature/awesome

Open a Pull Request describing your work
