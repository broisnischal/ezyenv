#!/bin/sh

TARGET_DIR="/usr/local/bin"
TARGET_FILE="$TARGET_DIR/ezyenv"

if [ -f "$TARGET_FILE" ]; then
  echo "Removing ezyenv..."
  rm "$TARGET_FILE"
  echo "ezyenv has been uninstalled."
else
  echo "ezyenv is not installed."
fi
