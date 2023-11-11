enum CONFIG {
  VERSION = "v1.0.0",
  AUTHOR = "Piarre",
}

enum AVAILABLE_COMMANDS {
  ADD = "add",
  COMMIT = "commit",
  HELP = "help",
}

type COMMANDS = "add" | "commit" | "help";

let commandList: COMMANDS[] = ["add", "commit", "help"];

const HELP = `
Available commands:
  - ${AVAILABLE_COMMANDS.ADD} : Add all files to the staging area
  - ${AVAILABLE_COMMANDS.COMMIT} : Commit all files from the staging area
  
  - ${AVAILABLE_COMMANDS.HELP} : Display this message
`;

export { CONFIG, AVAILABLE_COMMANDS, HELP, commandList };
