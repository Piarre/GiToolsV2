import { confirm, intro, outro, select, spinner } from "@clack/prompts";
import chalk from "chalk";
import { commandList } from "./config.js";

/** Local imports */
import { Git } from "./utils/git.js";
import checkForNewVersion from "./utils/checkNewVersion.js";
import { AVAILABLE_COMMANDS, HELP } from "./config.js";

(async (args: any) => {
  const command = args[0] as string;

  // await checkForNewVersion();
  await Git.checkForRepository();

  if (!command) {
    const cmd = await select({
      message: "Tests",
      options: commandList.map((cmd: any) => {
        return {
          name: cmd,
          value: (cmd as string).charAt(0).toUpperCase() + cmd.slice(1),
        };
      }) as any,
      initialValue: "help",
      maxItems: 1,
    });

    if (cmd.toString().toLowerCase() == AVAILABLE_COMMANDS.ADD) {
      await Git.getFilesToAdd();
    }

    if (cmd.toString().toLowerCase() == AVAILABLE_COMMANDS.COMMIT) {
      await Git.commit();
    }

    if (cmd.toString().toLowerCase() == AVAILABLE_COMMANDS.HELP) {
      outro(HELP);
      process.exit(0);
    }
  }

  if (command == AVAILABLE_COMMANDS.ADD) {
    await Git.getFilesToAdd();
  }

  if (command == AVAILABLE_COMMANDS.COMMIT) {
    await Git.commit();
  }

  if (command == AVAILABLE_COMMANDS.HELP) {
    intro(HELP);
    process.exit(0);
  }
})(process.argv.slice(2));
