import { intro, outro, spinner } from "@clack/prompts";
import { rmSync } from "fs";
import { execa } from "execa";

(async () => {
  intro("GiToolsV2 Builder");
  const s = spinner();
  s.start("Building");
  await rmSync("out/", {
    force: true,
    recursive: true,
  });
  await execa("npx", ["tsc", "-p", "tsconfig.json"]);
  s.stop();
  outro("Done!");
})();
