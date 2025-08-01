# PcketLens
Explore the world through your packets! PacketLens transforms your Wireshark JSON exports into a dynamic, interactive map of your TCP packet journeys. Visualize hops, track latency, and discover the geography of your network traffic.

<img width="1898" height="937" alt="image" src="https://github.com/user-attachments/assets/17091630-06d1-4f5c-8690-0b1033a6dba4" />


# 🚀 Features
Feature	Description
🌍 Global Mapping	Pinpoint each TCP packet hop on an interactive Leaflet map.
🔄 Wireshark JSON Import	Directly ingest JSON exports from Wireshark with one click.
👤 User Accounts	Secure login, dashboard, and history of all your packet captures.
📈 Statistics & Insights	View per-capture metrics: total hops, average latency, geo-distribution.
🎨 Dark Mode & Themes	Built-in light/dark themes for comfortable viewing anytime.
⚡️ Real-Time Preview	Instant visualization as you upload—no waiting required.

<img width="1919" height="948" alt="image" src="https://github.com/user-attachments/assets/30293ac7-34d4-4341-afee-7a6d5ab4cbe0" />

<img width="1919" height="934" alt="image" src="https://github.com/user-attachments/assets/ea48861f-80d0-45ac-8ee4-6253935f13bc" />

# 🛠️ Tech Stack

Frontend: React · Redux Toolkit · Leaflet · Tailwind CSS

Backend: Firebase, Firestore

Geolocation: MaxMind GeoIP2 or IPstack API

⚙️ Quick Start
bash
# 1. Clone the repo
git clone https://github.com/suvrat007/packetLens.git
cd packetLens

# 2. Install dependencies
npm install

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

# 🎯 Usage
Create account and save your files

Export from Wireshark:
File → Export Packet Dissections → as JSON

Upload your .json file on PacketLens.

Visualize packet hops, zoom to regions, and inspect latencies.

Analyze past captures in your personal dashboard.

# 🤝 Contributing
We welcome contributions! Please:

Fork the repository

Create a branch: git checkout -b feature/awesome

Commit your changes: git commit -m "Add awesome feature"

Push to your fork: git push origin feature/awesome

Open a Pull Request describing your work
