import { isCancel, outro } from "@clack/prompts";
import chalk from "chalk";
import { gitmojis } from "gitmojis";

export function Cancel(event: unknown, message?: string) {
  if (isCancel(event)) {
    outro(`🔥 ${chalk.red(message || "Exited")}`);
    process.exit(0);
  }
}

export function Exit(message: string) {
  outro(`${gitmojis} ${chalk.red(message)}`);
  process.exit(0);
}

export function message(message: string, /** emoji: string, */ color?: string) {
  return chalk.hex(color || "#ff8c00")(message);
}
