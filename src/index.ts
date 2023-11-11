import { confirm, intro, outro, spinner } from "@clack/prompts";
import chalk from "chalk";

/** Local imports */
import { Git } from "./utils/git.js";
import checkForNewVersion from "./utils/checkNewVersion.js";
import { AVAILABLE_COMMANDS, HELP } from "./config.js";

(async (args: any) => {
  const command = args[0] as string;

  // await checkForNewVersion();
  await Git.checkForRepository();

  if (
    command.length == 0 ||
    !Object.values(AVAILABLE_COMMANDS).includes(command as AVAILABLE_COMMANDS) ||
    command == AVAILABLE_COMMANDS.HELP
    // !(Command(command) == "help")
  ) {
    console.log(chalk.white.bold(HELP));
    return process.exit(0);
  }

  if (command == AVAILABLE_COMMANDS.ADD) {
    await Git.getFilesToAdd();
  }

  if (command == AVAILABLE_COMMANDS.COMMIT) {
    await Git.commit();
  }
})(process.argv.slice(2));
