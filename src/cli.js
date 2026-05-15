#!/usr/bin/env node
import fs from "node:fs/promises";
import { analyzeLogs } from "./analyzer.js";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node src/cli.js data/sample.log");
  process.exit(1);
}

const text = await fs.readFile(filePath, "utf8");
console.log(JSON.stringify(analyzeLogs(text.split(/\r?\n/)), null, 2));
