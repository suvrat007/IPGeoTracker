PacketLens
An interactive web application that visualizes the global path of your TCP packets on a world map. Simply export your Wireshark capture as JSON, upload it, and watch your network traffic pin itself around the globe.

Demo
https://packetlens.vercel.app/

Features
Visualize TCP packet routes on an interactive Leaflet world map

Import JSON exports from Wireshark

User account system to save and manage packet captures

Live API powered by Express (backend) and Redux Toolkit (frontend)

Responsive design with Tailwind CSS

Getting Started
Prerequisites
Node.js ≥14.x

npm ≥6.x

Installation
Clone the repository

bash
git clone https://github.com/suvrat007/packetLens.git
cd packetLens
Copy environment variables

bash
cp .env.example .env
Install dependencies

bash
npm install
Start development server

bash
npm start
Open your browser at http://localhost:3000

Usage
Create a free account or log in.

In Wireshark, export your capture as JSON:
File → Export Packet Dissections → as JSON

On PacketLens, click Upload Capture, select your JSON file, and submit.

Watch the pins trace your packets’ journey across the globe.

Manage and revisit past captures from your dashboard.

Project Structure
text
.
├── api/                  # Express backend (endpoints, auth, geolocation)
├── public/               # Static assets and HTML template
├── src/                  # React app (components, Redux slices, hooks)
├── .env                  # Environment variables
├── package.json          # Project metadata & scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # This file
Configuration
Rename .env.example to .env and set:

text
PORT=3000
API_URL=http://localhost:3000/api
JWT_SECRET=<your_jwt_secret>
GEOIP_API_KEY=<your_geolocation_api_key>
MONGO_URI=<your_mongodb_connection_uri>
Technology Stack
Frontend: React, Redux Toolkit, Leaflet, Tailwind CSS

Backend: Node.js, Express, MongoDB, JWT authentication

Geolocation: MaxMind GeoIP2 or IPstack API

Contributing
Fork the repository

Create a feature branch (git checkout -b feature/XYZ)

Commit your changes (git commit -m "Add XYZ")

Push to your fork (git push origin feature/XYZ)

Open a pull request

Please follow the existing code style and include tests for new functionality.
