#!/bin/bash

file="${1}"
sample="${2:-example}"

env_files=$(find . -maxdepth 1 -type f -regex '.*\.env\([^.]*\)$' ! -iname '*example*' ! -iname '*sample*' ! -iname "*$sample*")

if [ -z "$env_files" ] && [ -z "$file" ]; then
  echo "No .env files found."
  exit 1
fi

generate_example_file() {
  local file="$1"
  if [ ! -f "$file" ]; then
    echo "Error: File '$file' does not exist"
    return
  fi

  content=$(cat "$file")
  example_content=$(echo "$content" | awk -F '=' '{print $1"="}')

  example_path="${file}.$sample"
  echo "$example_content" > "$example_path"
  
  # Add the script to package.json
  package_json="package.json"
  if [ -f "$package_json" ]; then
    if ! grep -q '"ezy"' "$package_json"; then
      manager=$(get_package_manager)
      case $manager in
        "npm") script="npx ezyenv" ;;
        "yarn") script="yarn ezyenv" ;;
        "pnpm") script="pnpm ezyenv" ;;
        "bun") script="bunx ezyenv" ;;
        *) echo "ezyenv: Script not added!" ;;
      esac
      if [ -n "$script" ]; then
        jq --arg script "$script" '.scripts.ezy = $script' "$package_json" > temp.json && mv temp.json "$package_json"
      fi
    fi
  fi

  echo "ezyenv: created $example_path"
}

get_package_manager() {
  if [ -f "yarn.lock" ]; then
    echo "yarn"
  elif [ -f "pnpm-lock.yaml" ] || [ -f "pnpm-workspace.yaml" ]; then
    echo "pnpm"
  elif [ -f "package-lock.json" ]; then
    echo "npm"
  elif [ -f "bun.lockb" ]; then
    echo "bun"
  else
    echo "unknown"
  fi
}

remove_example_files() {
  example_files=$(find . -maxdepth 1 -type f \( -name '*.env*' -and \( -iname '*example*' -or -iname '*sample*' -or -iname '*eg*' -or -iname "*$sample*" \) \))
  
  for file in $example_files; do
    rm -f "$file"
  done

  echo "ezyenv: removed!"
  exit 0
}

if [ "$file" == "rm" ]; then
  remove_example_files
elif [ -n "$file" ]; then
  generate_example_file "$file"
else
  for env_file in $env_files; do
    generate_example_file "$env_file"
  done
fi

exit 0
