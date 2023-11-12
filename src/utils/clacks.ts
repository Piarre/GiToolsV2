import { isCancel, outro } from "@clack/prompts";
import chalk from "chalk";

export function Cancel(event: unknown) {
  if (isCancel(event)) {
    outro(chalk.red("Exited"));
    process.exit(0);
  }
}
