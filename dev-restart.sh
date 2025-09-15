#!/bin/bash

echo "🔍 Cleaning up existing development processes..."

# Kill any existing npm/vite processes for this project
pkill -f "vite.*newportfolio" || true
pkill -f "npm.*run.*dev" || true

echo "⏳ Waiting for processes to terminate..."
sleep 2

# Clear Vite cache
echo "🧹 Clearing Vite cache..."
rm -rf node_modules/.vite
rm -rf .vite

# Clear any port locks
echo "🔓 Checking for port conflicts..."
PORTS_IN_USE=$(ss -tlnp | grep -E ":(517[3-9]|518[0-9])" | wc -l)
if [ "$PORTS_IN_USE" -gt 0 ]; then
    echo "⚠️  Found $PORTS_IN_USE development servers running on ports 5173-5189"
    echo "   Consider stopping other dev servers if HMR issues persist"
fi

echo "🚀 Starting fresh development server..."
npm run dev