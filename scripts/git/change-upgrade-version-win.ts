import { tmpdir, homedir } from "node:os";
import { createWriteStream, unlinkSync } from "node:fs";
import {
    mkdirSync,
    rmSync,
    readdirSync,
    renameSync,
    existsSync,
    statSync
} from "node:fs";
import { join, basename } from "node:path";
import AdmZip from "adm-zip";

// === 設定 ===
const DIR = "tools";
const OWNER = "ShionTerunaga";
const REPO = "create-react-template";
const BRANCH = "release";

export async function main(TARGET_DIR_IN_ZIP: string) {
    const tmpBase = join(tmpdir(), `upgrade-tmp-${Date.now()}`);
    const zipPath = join(tmpBase, `${REPO}.zip`);
    const extractDir = join(tmpBase, "extract");
    const toolsDir = join(homedir(), DIR);

    mkdirSync(tmpBase, { recursive: true });
    mkdirSync(extractDir, { recursive: true });

    console.log("📦 Downloading ZIP...");
    const zipUrl = `https://github.com/${OWNER}/${REPO}/archive/refs/heads/${BRANCH}.zip`;
    // use Node http(s) download to avoid external curl/Schannel issues on Windows
    await downloadFile(zipUrl, zipPath);

    console.log("🧩 Extracting...");
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractDir, true);

    // 展開後フォルダ（例: create-react-template-release）
    const [rootFolder] = readdirSync(extractDir);
    const extractedRoot = join(extractDir, rootFolder);
    const sourceDir = join(extractedRoot, TARGET_DIR_IN_ZIP);

    if (!existsSync(sourceDir)) {
        throw new Error(`❌ target directory not found in zip: ${sourceDir}`);
    }

    for (const item of readdirSync(toolsDir)) {
        if (item === basename(__filename)) continue; // 自分自身は消さない
        if (item === ".git") continue;
        const p = join(toolsDir, item);
        rmSync(p, { recursive: true, force: true });
        console.log("removed:", p);
    }

    console.log("📁 Copying files from:", sourceDir);
    copyRecursive(sourceDir, toolsDir);

    console.log("🧹 Cleaning temp files...");
    rmSync(tmpBase, { recursive: true, force: true });

    console.log("✅ Upgrade complete!");
}

function copyRecursive(src: string, dest: string) {
    for (const item of readdirSync(src)) {
        const s = join(src, item);
        const d = join(dest, item);
        const st = statSync(s);
        if (st.isDirectory()) {
            mkdirSync(d, { recursive: true });
            copyRecursive(s, d);
        } else {
            renameSync(s, d);
            console.log(`copied: ${d}`);
        }
    }
}

async function downloadFile(url: string, destPath: string): Promise<void> {
    const maxRedirects = 10;
    const httpModule = url.startsWith("https")
        ? await import("node:https")
        : await import("node:http");

    return new Promise((resolve, reject) => {
        const doRequest = (u: string, redirectsLeft: number) => {
            const req = httpModule.get(u, (res: any) => {
                // handle redirect
                if (
                    res.statusCode &&
                    res.statusCode >= 300 &&
                    res.statusCode < 400 &&
                    res.headers.location
                ) {
                    if (redirectsLeft <= 0)
                        return reject(new Error("Too many redirects"));
                    const loc = res.headers.location.startsWith("http")
                        ? res.headers.location
                        : new URL(res.headers.location, u).toString();
                    res.resume();
                    return doRequest(loc, redirectsLeft - 1);
                }

                if (res.statusCode !== 200) {
                    res.resume();
                    return reject(
                        new Error(`Download failed: ${res.statusCode}`)
                    );
                }

                const file = createWriteStream(destPath);
                res.pipe(file);
                file.on("finish", () => file.close(() => resolve()));
                file.on("error", (err) => {
                    try {
                        unlinkSync(destPath);
                    } catch (_) {}
                    reject(err);
                });
            });
            req.on("error", (err: Error) => reject(err));
        };

        doRequest(url, maxRedirects);
    });
}

const WIN = "execution/win";

main(WIN).catch((e) => {
    console.error("❌ Upgrade failed:", e);
    process.exit(1);
});
