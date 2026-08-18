import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const apiDir = resolve(repoRoot, "apps", "api");
const isWindows = process.platform === "win32";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    cwd: options.cwd,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function findPythonInvoker() {
  const candidates = [
    { command: "python", args: [] },
    { command: "py", args: ["-3"] },
  ];

  for (const candidate of candidates) {
    const result = spawnSync(candidate.command, [...candidate.args, "--version"], {
      stdio: "ignore",
    });

    if (!result.error && result.status === 0) {
      return candidate;
    }
  }

  return null;
}

function findUvCommand() {
  const localUv = isWindows
    ? resolve(apiDir, ".venv", "Scripts", "uv.exe")
    : resolve(apiDir, ".venv", "bin", "uv");

  if (existsSync(localUv)) {
    return { command: localUv, args: [] };
  }

  const pathUv = spawnSync("uv", ["--version"], { stdio: "ignore" });
  if (!pathUv.error && pathUv.status === 0) {
    return { command: "uv", args: [] };
  }

  const pythonInvoker = findPythonInvoker();
  if (!pythonInvoker) {
    throw new Error("Python was not found on PATH. Install Python 3.12+ and uv before running pnpm install.");
  }

  run(pythonInvoker.command, [...pythonInvoker.args, "-m", "pip", "install", "--user", "uv"]);

  return { command: pythonInvoker.command, args: [...pythonInvoker.args, "-m", "uv"] };
}

const uvCommand = findUvCommand();
const activeVenv = process.env.VIRTUAL_ENV;
const projectVenv = resolve(apiDir, ".venv");
const syncArgs = ["sync"];

if (activeVenv && resolve(activeVenv) !== projectVenv) {
  syncArgs.push("--active");
}

run(uvCommand.command, [...uvCommand.args, ...syncArgs], { cwd: apiDir });