import { copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'prototypes', 'layout');
const output = join(root, 'vercel-preview');
const assets = [
  'cielo-atmosferico.webp',
  'fonts/HaasGrotDisp-55Roman.otf',
  'fonts/HaasGrotDisp-65Medium.otf',
  'fonts/HaasGrotDisp-75Bold.otf',
  'fonts/HaasGrotDisp-95Black.otf',
  'fundador-editorial.webp',
  'grano-malla.png',
  'motion-diagnostico.mp4',
  'motion-ejecucion.mp4',
  'motion-mapa.mp4',
  'paisaje.jpg',
];

await rm(output, { recursive: true, force: true });
await mkdir(join(output, 'fonts'), { recursive: true });
await mkdir(join(output, 'aplicar'), { recursive: true });
await Promise.all([
  copyFile(join(source, 'apertura.html'), join(output, 'index.html')),
  copyFile(join(root, 'prototypes', 'aplicar', 'index.html'), join(output, 'aplicar', 'index.html')),
  ...assets.map(asset => copyFile(join(source, asset), join(output, asset))),
]);
