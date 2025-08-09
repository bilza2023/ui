// scripts/validateDeck.js
import fs from "node:fs";
import chalk from "chalk";
import { validate } from "../src/lib/taleemDoctor/taleemDoctor.js";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/validateDeck.js path/to/deck.json");
  process.exit(1);
}

const deck = JSON.parse(fs.readFileSync(file, "utf8"));
const report = validate(deck);

const okText = report.ok
  ? chalk.bgGreen.black(" OK ")
  : chalk.bgRed.white(" NOT OK ");

console.log(`${okText}  ${chalk.bold("errors:")}${report.errors.length}  ${chalk.bold("warnings:")}${report.warnings.length}`);

const { slideCount, duration, items } = report.stats;
console.log(
  chalk.cyanBright("Stats:") +
    ` slides:${slideCount}  duration:${duration}s  items:${items}`
);

if (report.errors.length) {
  console.log(chalk.redBright("\nErrors:"));
  report.errors.forEach((e) => {
    console.log(chalk.red(`- ${e.code}`) + ` ${e.path || ""} — ${e.message}`);
  });
}

if (report.warnings.length) {
  console.log(chalk.yellowBright("\nWarnings:"));
  report.warnings.forEach((w) => {
    console.log(chalk.yellow(`- ${w.code}`) + ` ${w.path || ""} — ${w.message}`);
  });
}

process.exit(report.ok ? 0 : 1);
