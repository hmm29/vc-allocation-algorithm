#!/bin/bash

# Install frontend dependencies if node_modules is not present
echo "Checking frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

# Start the React app
echo "Starting frontend..."
npm start &
FRONTEND_PID=$!

# Install backend dependencies if node_modules is not present
echo "Checking backend dependencies..."
cd ../backend
if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
fi

# Start the Express app
echo "Starting backend..."
node index.js &
BACKEND_PID=$!

# Trap to ensure both processes are terminated on script exit
trap "kill $FRONTEND_PID $BACKEND_PID" EXIT

# Wait for both processes to finish
wait