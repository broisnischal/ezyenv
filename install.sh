#!/bin/sh

TARGET_DIR="/usr/local/bin"
TARGET_FILE="$TARGET_DIR/ezyenv"

echo "Downloading ezyenv..."

# Download latest version
curl -fsSL https://github.com/broisnischal/ezyenv/releases/latest/download/ezyenv -o "$TARGET_FILE"

if [ $? -ne 0 ]; then
  echo "Download failed. Check the URL or permissions."
  exit 1
fi

# Make it executable
chmod +x "$TARGET_FILE"

echo "ezyenv installed/updated successfully! Run 'ezyenv' to use it."
