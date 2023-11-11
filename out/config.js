var CONFIG;
(function (CONFIG) {
    CONFIG["VERSION"] = "v1.0.0";
    CONFIG["AUTHOR"] = "Piarre";
})(CONFIG || (CONFIG = {}));
var AVAILABLE_COMMANDS;
(function (AVAILABLE_COMMANDS) {
    AVAILABLE_COMMANDS["ADD"] = "add";
    AVAILABLE_COMMANDS["COMMIT"] = "commit";
    AVAILABLE_COMMANDS["HELP"] = "help";
})(AVAILABLE_COMMANDS || (AVAILABLE_COMMANDS = {}));
const HELP = `
Available commands:
  - ${AVAILABLE_COMMANDS.ADD} : Add all files to the staging area
  - ${AVAILABLE_COMMANDS.COMMIT} : Commit all files from the staging area
  
  - ${AVAILABLE_COMMANDS.HELP} : Display this message
`;
export { CONFIG, AVAILABLE_COMMANDS, HELP };
