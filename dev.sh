#!/bin/bash
# Start the local dev server on http://localhost:4307
cd "$(dirname "$0")"

# Install the dependencies when they are missing.
if [ ! -d node_modules ]; then
  pnpm install
fi

pnpm dev
