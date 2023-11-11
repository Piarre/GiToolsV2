var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
/** Local imports */
import { Git } from "./utils/git.js";
import { AVAILABLE_COMMANDS, HELP } from "./config.js";
((args) => __awaiter(void 0, void 0, void 0, function* () {
    const command = args[0];
    // await checkForNewVersion();
    yield Git.checkForRepository();
    if (command.length == 0 ||
        !Object.values(AVAILABLE_COMMANDS).includes(command) ||
        command == AVAILABLE_COMMANDS.HELP
    // !(Command(command) == "help")
    ) {
        console.log(chalk.white.bold(HELP));
        return process.exit(0);
    }
    if (command == AVAILABLE_COMMANDS.ADD) {
        yield Git.getFilesToAdd();
    }
    if (command == AVAILABLE_COMMANDS.COMMIT) {
        yield Git.commit();
    }
}))(process.argv.slice(2));
