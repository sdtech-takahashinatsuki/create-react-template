import { resolve, basename } from "node:path";
import { TemplateInfo } from "./types";
import { mkdirSync } from "node:fs";
import { isFolderEmpty } from "./helper/is-folder-empty";
import { green } from "picocolors";
import { installTemplate } from "./template-index";

export async function createApp({
    appPath,
    templateInfo
}: {
    appPath: string;
    templateInfo: TemplateInfo;
}) {
    const root = resolve(appPath);
    const appName = basename(appPath);

    mkdirSync(root, { recursive: true });

    if (!isFolderEmpty(root, appName)) {
        process.exit(1);
    }

    console.log(`Creating a new React app in ${green(root)}.`);
    console.log();

    process.chdir(root);

    await installTemplate({
        appName,
        root,
        framework: templateInfo.framework
    });
}
