#!/usr/bin/env bash
set -e
rm -rf node_modules
npm config set registry https://registry.npmjs.org/
npm ci --no-audit --no-fund
npm run dev
