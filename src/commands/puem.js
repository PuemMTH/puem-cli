#!/usr/bin/env node

import chalk from "chalk";
import getDate from "../function/date_format.js";
import downloadVideo from "../function/downloadVideo.js";
import fs from "fs/promises";
import path from "path";

const args = process.argv.slice(2);

const commands = [
  {
    name: "help",
    description: "Show this help message",
  },
  {
    name: "date",
    description: "Convert date to Thai format",
    options: [
      {
        name: "d",
        description: "Date format (default: 1)",
      },
    ],
  },
  {
    name: "download",
    description: "Download video from YouTube",
    options: [
      {
        name: "u",
        description: "YouTube video URL",
      }
    ]
  },
  {
    name: "version",
    description: "Show version information",
  }
];

function showHelp() {
  console.log(chalk.blue("Showing help information..."));
  console.log(chalk.green("Usage: your-command <arguments>"));
  console.log(chalk.yellow("Available arguments:"));

  commands.forEach(({ name, description, options }) => {
    console.log(chalk.yellow(`${name}`));
    console.log(chalk.white(`${description}`));
    if (options) {
      console.log(chalk.yellow(" Available options:"));
      options.forEach(({ name, description }) => {
        console.log(chalk.yellow(` -${name}`));
        console.log(chalk.white(` ${description}`));
      });
    }
  });
}

async function showVersion() {
  try {
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = await fs.readFile(packageJsonPath, "utf-8");
    const { version } = JSON.parse(packageJson);
    console.log(chalk.blue(`Version: ${version}`));
  } catch (error) {
    console.log(chalk.red("Error reading package.json:", error));
  }
}

const [command, ...otherArgs] = args;

switch (command) {
  case "help":
    showHelp();
    break;
  case "date":
    if (otherArgs.length > 0) {
      if (otherArgs[0] === "-d") {
        if (otherArgs[1] === undefined) {
          console.log(chalk.red("Invalid date format!"));
          break;
        }
        console.log(chalk.magenta("Date:"), getDate(otherArgs[1]));
      }
    } else {
      console.log(chalk.red("Arguments not found!"));
    }
    break;
  case "download":
    if (otherArgs.length > 0) {
      if (otherArgs[0] === "-u") {
        if (otherArgs[1] === undefined) {
          console.log(chalk.red("Invalid YouTube video URL!"));
          break;
        }
        downloadVideo(otherArgs[1]);
      }
    } else {
      console.log(chalk.red("Arguments not found!"));
    }
    break;
  case "version":
  case "-v":
    showVersion();
    break;
  default:
    console.log(chalk.red("Command not found!"));
}