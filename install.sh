#!/bin/sh

TARGET_DIR="/usr/local/bin"

echo "Downloading ezyenv..."
curl -fsSL https://github.com/broisnischal/ezyenv/releases/latest/download/ezyenv -o "$TARGET_DIR/ezyenv"

if [ $? -ne 0 ]; then
  echo "Download failed. Check the URL or permissions."
  exit 1
fi

chmod +x "$TARGET_DIR/ezyenv"
echo "ezyenv installed successfully! Run 'ezyenv' to use it."
