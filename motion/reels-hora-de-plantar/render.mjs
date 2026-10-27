// uso: node render.mjs stills 1.8 5.5 ...   (gera saida/stills/t1.8.jpg ...)
//      node render.mjs video saida/video_mudo.mp4
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const dir = path.dirname(new URL(import.meta.url).pathname);
const [mode, ...args] = process.argv.slice(2);
const FPS = 30, DUR = 30;

const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto('file://' + path.join(dir, 'reels.html'));
await page.evaluate(() => window.ready);

const grab = (t) => page.evaluate((t) => { window.render(t); return document.getElementById('c').toDataURL('image/jpeg', 0.95); }, t);

if (mode === 'stills') {
  mkdirSync(path.join(dir, 'saida', 'stills'), { recursive: true });
  for (const a of args) {
    const d = await grab(parseFloat(a));
    writeFileSync(path.join(dir, 'saida', 'stills', `t${a}.jpg`), Buffer.from(d.split(',')[1], 'base64'));
  }
} else {
  const out = path.resolve(args[0] || path.join(dir, 'saida', 'video_mudo.mp4'));
  mkdirSync(path.dirname(out), { recursive: true });
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'slow', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < FPS * DUR; f++) {
    const d = await grab(f / FPS);
    if (!ff.stdin.write(Buffer.from(d.split(',')[1], 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 150 === 0) console.log('frame', f);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
}
await browser.close();
