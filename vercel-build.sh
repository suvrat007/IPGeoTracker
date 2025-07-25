#!/bin/bash

echo "✅ Installing Git LFS and pulling files..."
git lfs install
git lfs pull

echo "🚧 Installing dependencies..."
npm install

echo "🔨 Building the React app..."
npm run build
