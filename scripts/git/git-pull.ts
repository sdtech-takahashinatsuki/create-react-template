import { exec } from "child_process";

console.log("Starting git pull....");

exec("git pull origin main", (error, stdout, stderr) => {
  if (error) {
    console.error(`エラー: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`標準エラー: ${stderr}`);
    return;
  }
  console.log(`出力: ${stdout}`);
});
