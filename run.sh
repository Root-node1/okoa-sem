#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_DIR="$ROOT_DIR/backend"

FRONTEND_PORT="${FRONTEND_PORT:-5173}"
BACKEND_PORT="${BACKEND_PORT:-5000}"

check_cmd() {
  command -v "$1" >/dev/null 2>&1
}

if ! check_cmd node; then
  echo "Error: Node.js is not installed." >&2
  exit 1
fi

if ! check_cmd npm; then
  echo "Error: npm is not installed." >&2
  exit 1
fi

if [ ! -d "$FRONTEND_DIR/node_modules" ] || [ ! -d "$BACKEND_DIR/node_modules" ] || [ ! -d "$ROOT_DIR/node_modules" ]; then
  echo "Dependencies are not installed."
  echo "Run: npm install && npm --prefix frontend install && npm --prefix backend install"
  exit 1
fi

if [ ! -f "$BACKEND_DIR/.env" ]; then
  echo "Warning: backend/.env not found. Copy backend/.env.example to backend/.env and configure it."
fi

if [ ! -f "$FRONTEND_DIR/.env" ]; then
  echo "Warning: frontend/.env not found. Copy frontend/.env.example to frontend/.env."
fi

BACKEND_PID=""
FRONTEND_PID=""

cleanup() {
  echo ""
  echo "Shutting down development servers..."
  if [ -n "$FRONTEND_PID" ] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
    kill "$FRONTEND_PID" 2>/dev/null || true
    wait "$FRONTEND_PID" 2>/dev/null || true
  fi
  if [ -n "$BACKEND_PID" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID" 2>/dev/null || true
    wait "$BACKEND_PID" 2>/dev/null || true
  fi
  # Kill process trees
  pkill -P "$$" 2>/dev/null || true
  echo "Stopped."
}
trap cleanup INT TERM EXIT

echo "Starting backend on http://localhost:${BACKEND_PORT} ..."
(
  cd "$BACKEND_DIR"
  PORT="$BACKEND_PORT" npm run dev
) &
BACKEND_PID=$!

# Give backend a moment to start
sleep 2

echo "Starting frontend on http://localhost:${FRONTEND_PORT} ..."
(
  cd "$FRONTEND_DIR"
  npm run dev -- --port "$FRONTEND_PORT"
) &
FRONTEND_PID=$!

echo ""
echo "Frontend: http://localhost:${FRONTEND_PORT}"
echo "Backend:  http://localhost:${BACKEND_PORT}"
echo "Press Ctrl+C to stop both servers."
echo ""

# Wait for either process to exit
wait -n "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true

# If one exited, stop the other
cleanup
trap - INT TERM EXIT
