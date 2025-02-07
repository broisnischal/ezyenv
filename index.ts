#!/usr/bin/env bun

import { $ } from "bun";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const envFiles = [
  ".env",
  ".env.local",
  ".env.development",
  ".env.production",
  "production.env",
  "development.env",
  "local.env",
  "test.env",
  "staging.env",
  "qa.env",
  "dev.env",
  "prod.env",
  "stage.env",
  "preprod.env",
  "qa.env",
  "dev.env",
].filter((file) => existsSync(file));

if (envFiles.length === 0) {
  console.log("No .env files found.");
  process.exit(1);
}

const generateExampleFile = (file: string) => {
  const envPath = resolve(file);
  const content = readFileSync(envPath, "utf-8");
  const lines = content.split("\n");

  const exampleContent = lines
    .map((line) => {
      if (line.trim().startsWith("#") || !line.includes("=")) return line; // Keep comments and empty lines
      return line.split("=")[0] + "=";
    })
    .join("\n");

  const examplePath = `${file}.example`;
  writeFileSync(examplePath, exampleContent);
  console.log(`Generated: ${examplePath}`);
};

envFiles.forEach(generateExampleFile);
