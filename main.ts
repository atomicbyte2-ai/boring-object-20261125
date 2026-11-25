import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line review of a paperclip: the dullest office object, whose whole
// career ends the day someone unfolds it to poke a router reset button.
// The last words are the punchline — it never goes back to clipping.
const LINE =
  "Five stars. It held my papers together for four years, then I unfolded it to poke my router's reset button, and it has never clipped a thing since.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`Line must be 1-200 characters, got ${line.length}.`);
  }
  if (line.trim().length === 0) {
    throw new Error("Line must not be only whitespace.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Line must be a single line.");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("Line must not contain control characters.");
  }
}

validate(LINE);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote entry.txt (${LINE.length} characters, ${LINE.split(" ").length} words).`);
