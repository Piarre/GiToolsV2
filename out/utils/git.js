var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { execa } from "execa";
import chalk from "chalk";
import { existsSync } from "fs";
import { confirm, intro, multiselect, outro, spinner, text } from "@clack/prompts";
export var Git;
(function (Git) {
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield execa("git", ["init"]);
        });
    }
    Git.init = init;
    function checkForRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            const repoExists = yield existsSync(".git");
            if (!repoExists) {
                const repoSpinner = spinner();
                intro(chalk.red("This folder is not a git repository!"));
                const test = yield confirm({
                    message: "Create new repository?",
                    initialValue: true,
                });
                if (test.valueOf()) {
                    repoSpinner.start("Creating...");
                    yield init();
                    repoSpinner.stop("Done");
                    outro(chalk.green("New repository created"));
                }
                else {
                    outro(chalk.red("Exited"));
                    process.exit(0);
                }
            }
            return;
        });
    }
    Git.checkForRepository = checkForRepository;
    function getFilesToAdd() {
        return __awaiter(this, void 0, void 0, function* () {
            const { stdout } = yield execa("git", ["status", "-s"]);
            const files = stdout.split("\n").map((line) => line.slice(3));
            const filesToAdd = (yield multiselect({
                message: "Select additional tools.",
                options: files.map((file) => {
                    return { value: file, label: file };
                }),
                required: false,
            }));
            // execa("git", ["add", filesToAdd.join(" ")]);
        });
    }
    Git.getFilesToAdd = getFilesToAdd;
    function commit() {
        return __awaiter(this, void 0, void 0, function* () {
            intro("git commit");
            const commitMsg = (yield text({
                message: "Commit message",
                placeholder: "Enter commit message",
            }));
            const descNeeded = yield confirm({
                message: "Do you want to add a description?",
            });
            if (descNeeded) {
                const desc = (yield text({
                    message: "Description",
                    placeholder: "Enter description",
                }));
                console.log(desc);
            }
            outro(`Commited with message: ${commitMsg}`);
            console.log(commitMsg);
        });
    }
    Git.commit = commit;
})(Git || (Git = {}));
