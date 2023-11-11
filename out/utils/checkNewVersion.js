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
import { intro, outro } from "@clack/prompts";
import { CONFIG } from "../config.js";
export default function chechForNewVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        const remoteVersion = yield fetch("https://api.github.com/repos/Piarre/GiTools/releases/latest")
            .then((res) => res.json())
            .then((data) => data.tag_name);
        if (remoteVersion !== CONFIG.VERSION) {
            intro(chalk.green(`A new version is available: ${remoteVersion}`));
            outro(chalk.green(`Update by running: npm i -g gitools@${CONFIG.VERSION}`));
            process.exit(0);
        }
    });
}
chechForNewVersion();
