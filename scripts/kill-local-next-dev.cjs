/**
 * Stops Next.js dev for THIS repo only, then removes a stale .next/dev/lock.
 * Use when you see: "Unable to acquire lock ... is another instance of next dev running?"
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const lockFile = path.join(root, ".next", "dev", "lock");

function killMatchingPids() {
  let output = "";
  try {
    output = execSync("ps -ax -o pid= -o command=", { encoding: "utf8", maxBuffer: 1024 * 1024 });
  } catch {
    return;
  }

  const lines = output.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (!trimmed.includes("next dev")) continue;
    if (!trimmed.includes(root)) continue;

    const pid = parseInt(trimmed.split(/\s+/)[0], 10);
    if (Number.isNaN(pid) || pid === process.pid) continue;

    try {
      process.kill(pid, "SIGTERM");
    } catch {
      /* ignore */
    }
  }
}

killMatchingPids();

// Give the process tree a moment to exit
const start = Date.now();
while (Date.now() - start < 600) {
  /* sync wait */
}

try {
  fs.unlinkSync(lockFile);
} catch {
  /* no lock or already gone */
}
