// NusaStat entry program (Node 22, standard library only).
//
// Hands the site in: copies app/ and screenshots/ from beside this file into
// the output directory and writes /output/dossier.json with the vendored
// make.fun library (vendor/makefun-frontend.ts, copied from the kit unchanged).
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The run is deterministic: the same input files always produce the same
// output bytes, so the grader's two runs agree.

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const REPO_ROOT = fileURLToPath(new URL('.', import.meta.url));
const OUTPUT_DIR = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

// Caps from the competition gate: app/ at most 993 entries / 16 MiB,
// screenshots at most 4 files of 256 KiB, dossier text at most 160 KiB.
const APP_MAX_ENTRIES = 993;
const APP_MAX_BYTES = 16 * 1024 * 1024;
const SHOTS_MAX = 4;
const SHOTS_MAX_BYTES = 256 * 1024;
const DOSSIER_TEXT_MAX_BYTES = 163840;

function fail(message: string): never {
  console.error(`nusa-stat: ${message}`);
  process.exit(1);
}

function countTree(dir: string): { entries: number; bytes: number } {
  let entries = 0;
  let bytes = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    entries += 1;
    if (st.isDirectory()) {
      const sub = countTree(p);
      entries += sub.entries;
      bytes += sub.bytes;
    } else if (st.isFile()) {
      bytes += st.size;
    } else {
      fail(`app contains a non-file entry: ${p}`);
    }
  }
  return { entries, bytes };
}

function checkAppTree(appDir: string): void {
  if (!existsSync(join(appDir, 'index.html'))) fail('app/index.html is missing');
  const { entries, bytes } = countTree(appDir);
  if (entries > APP_MAX_ENTRIES) fail(`app/ has ${entries} entries, over the ${APP_MAX_ENTRIES} cap`);
  if (bytes > APP_MAX_BYTES) fail(`app/ is ${bytes} bytes, over the ${APP_MAX_BYTES} cap`);
  console.log(`nusa-stat: app/ OK — ${entries} entries, ${bytes} bytes`);
}

function checkScreenshots(shotsDir: string): string[] {
  if (!existsSync(shotsDir)) fail('screenshots/ is missing');
  const names = readdirSync(shotsDir)
    .filter((n) => !n.startsWith('.'))
    .sort();
  if (names.length < 3 || names.length > SHOTS_MAX) {
    fail(`screenshots/ holds ${names.length} images, need 3–${SHOTS_MAX}`);
  }
  for (const name of names) {
    const p = join(shotsDir, name);
    const st = statSync(p);
    if (!st.isFile()) fail(`screenshots/${name} is not a regular file`);
    if (st.size > SHOTS_MAX_BYTES) fail(`screenshots/${name} is ${st.size} bytes, over ${SHOTS_MAX_BYTES}`);
    if (!/\.(png|jpe?g)$/i.test(name)) fail(`screenshots/${name} is not a PNG or JPEG`);
  }
  console.log(`nusa-stat: screenshots/ OK — ${names.join(', ')}`);
  return names;
}

function handIn(): void {
  const appDir = join(REPO_ROOT, 'app');
  const shotsDir = join(REPO_ROOT, 'screenshots');

  checkAppTree(appDir);
  checkScreenshots(shotsDir);

  // Start from a clean output directory so stale files can never leak in.
  rmSync(OUTPUT_DIR, { recursive: true, force: true });
  mkdirSync(OUTPUT_DIR, { recursive: true });

  cpSync(appDir, join(OUTPUT_DIR, 'app'), { recursive: true });
  mkdirSync(join(OUTPUT_DIR, 'screenshots'), { recursive: true });
  cpSync(shotsDir, join(OUTPUT_DIR, 'screenshots'), { recursive: true });

  const dossier = buildDossier(OUTPUT_DIR, {
    text_max_bytes: DOSSIER_TEXT_MAX_BYTES,
    screenshots: { max: SHOTS_MAX, max_bytes: SHOTS_MAX_BYTES },
    app_max_files: APP_MAX_ENTRIES,
    app_max_bytes: APP_MAX_BYTES,
  });
  writeFileSync(join(OUTPUT_DIR, 'dossier.json'), dossier);
  console.log(`nusa-stat: wrote ${OUTPUT_DIR}/dossier.json (${dossier.length} bytes)`);
  console.log('nusa-stat: hand-in complete');
}

handIn();
