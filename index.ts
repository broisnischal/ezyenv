#!/usr/bin/env bun

// import { $ } from "bun";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  unlinkSync,
} from "fs";
import { resolve } from "path";

const file = process.argv?.[2];
const sample = process.argv?.[3] ?? "example"; // sample, default, example, eg

const envFiles = existsSync(".")
  ? readdirSync(".").filter(
      (file: string) =>
        /^(?:.*\.env|\.env(?:\..+)?)$/.test(file) &&
        !file.toLowerCase().includes("example") &&
        !file.toLowerCase().includes("sample") &&
        !file.toLowerCase().includes(sample)
    )
  : [];

if (envFiles.length === 0 && !file) {
  console.log("No .env files found.");
  process.exit(1);
}

const generateExampleFile = (file: string) => {
  try {
    const envPath = resolve(file);

    if (!existsSync(envPath)) {
      console.error(`Error: File '${file}' does not exist`);
      return;
    }

    const content = readFileSync(envPath, "utf-8");
    const lines = content.split("\n");

    const exampleContent = lines
      .map((line) => {
        if (line.trim().startsWith("#") || !line.includes("=")) return line;
        return line.split("=")[0] + "=";
      })
      .join("\n");

    const examplePath = `${file}.${sample}`;
    const fileName = examplePath.split("/").pop();

    writeFileSync(examplePath, exampleContent);

    /**
     * Add the script to package.json
     */
    const packageJSON = getPackageJSON();

    if (packageJSON && !packageJSON.scripts.ezy) {
      addScriptToPackageJSON("ezy", "ezyenv");
    }

    console.log(`Ezy generated : ${fileName}`);
  } catch (error) {
    console.error(
      `Error processing file '${file}':`,
      error instanceof Error ? error.message : error
    );
  }
};

/** utils */
interface PackageJSON {
  scripts: {
    [key: string]: string;
  };
}

export function getPackageJSON(): PackageJSON | undefined {
  const packageJSONPath = resolve(process.cwd(), "package.json");

  try {
    return JSON.parse(readFileSync(packageJSONPath, "utf-8"));
  } catch (error) {
    return undefined;
  }
}

export function addScriptToPackageJSON(
  scriptName: string,
  scriptCommand: string
): void {
  const packageJSONPath = resolve(process.cwd(), "package.json");

  try {
    const packageJSON = getPackageJSON();

    if (!packageJSON) throw new Error("No package.json found");

    packageJSON.scripts = packageJSON.scripts || {};
    packageJSON.scripts[scriptName] = scriptCommand;

    writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
    console.log(`Script '${scriptName}' added to package.json !`);
  } catch (error) {
    console.error("Error adding script to package.json:", error);
  }
}

const removeExampleFiles = async () => {
  try {
    const files = readdirSync(".").filter(
      (file: string) =>
        (/^(?:.*\.env|\.env(?:\..+)?)$/.test(file) &&
          file.toLowerCase().includes("example")) ||
        file.toLowerCase().includes("sample") ||
        file.toLowerCase().includes("eg") ||
        file.toLowerCase().includes(sample)
    );

    files.forEach((file: string) => {
      unlinkSync(file);
    });

    console.log("ezyenv: removed!");
    process.exit(0);
  } catch (error) {
    console.error("Error removing example files:", error);
  }
};

if (file === "rm") {
  removeExampleFiles();
} else if (file) {
  generateExampleFile(file);
} else {
  envFiles.forEach(generateExampleFile);
}

process.exit(0);
