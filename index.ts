#!/usr/bin/env bun

// import { $ } from "bun";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

// const regex = /(?<==).*/g;

const fileName = process.argv?.[2] || ".env";

const envPath = resolve(process.cwd(), fileName);

const envFiles = [envPath].filter((file) => existsSync(file));

if (envFiles.length === 0) {
  console.log("No .env files found !");
  process.exit(0);
}

const generateExampleFile = (file: string) => {
  const envPath = resolve(file);
  const content = readFileSync(envPath, "utf-8");
  const lines = content.split("\n");

  const exampleContent = lines
    .map((line) => {
      if (line.trim().startsWith("#") || !line.includes("=")) return line;
      return line.split("=")[0] + "=";
    })
    .join("\n");

  const examplePath = `${file}.example`;
  const fileName = examplePath.split("/").pop();

  writeFileSync(examplePath, exampleContent);
  console.log(`Generated: ${fileName}`);
};

envFiles.forEach(generateExampleFile);
