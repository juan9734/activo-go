// Verifica los presupuestos de rendimiento de docs/04-calidad/presupuestos-de-rendimiento.md
// tras `npm run build`: bundle inicial (aviso 1,5 MB, error 2 MB) y chunks perezosos (< 50 kB).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KB = 1024;
const MB = 1024 * KB;
const AVISO_INICIAL = 1.5 * MB;
const ERROR_INICIAL = 2 * MB;
const MAX_CHUNK_PEREZOSO = 50 * KB;

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const indice = join(dist, 'index.html');
if (!existsSync(indice)) {
  console.error('No existe dist/index.html. Ejecute primero `npm run build`.');
  process.exit(1);
}

const esLegacy = (ruta) => ruta.includes('-legacy');
const tamano = (ruta) => statSync(join(dist, ruta)).size;
const formato = (bytes) => `${(bytes / KB).toFixed(1)} kB`;

const html = readFileSync(indice, 'utf8');
const iniciales = new Set(
  [...html.matchAll(/(?:src|href)="\/?(assets\/[^"]+\.(?:js|css))"/g)]
    .map((m) => m[1])
    .filter((ruta) => !esLegacy(ruta)),
);

const todosJs = readdirSync(join(dist, 'assets'))
  .filter((f) => f.endsWith('.js'))
  .map((f) => `assets/${f}`);
const perezosos = todosJs.filter((r) => !iniciales.has(r) && !esLegacy(r));

let hayError = false;

const totalInicial = [...iniciales].reduce((suma, r) => suma + tamano(r), 0);
console.log('Bundle inicial (JS + CSS):');
for (const r of iniciales) console.log(`  ${r.padEnd(50)} ${formato(tamano(r))}`);
console.log(`  TOTAL ${formato(totalInicial)} (${(totalInicial / MB).toFixed(2)} MB)`);
if (totalInicial > ERROR_INICIAL) {
  console.error('ERROR: el bundle inicial supera 2 MB.');
  hayError = true;
} else if (totalInicial > AVISO_INICIAL) {
  console.warn('AVISO: el bundle inicial supera 1,5 MB.');
}

console.log('\nChunks perezosos:');
if (perezosos.length === 0) {
  console.warn('  AVISO: no hay chunks perezosos; todas las pantallas viajan en el bundle inicial.');
}
for (const r of perezosos) {
  const t = tamano(r);
  const excede = t > MAX_CHUNK_PEREZOSO;
  console.log(`  ${r.padEnd(50)} ${formato(t)}${excede ? '  EXCEDE 50 kB' : ''}`);
  if (excede) hayError = true;
}

process.exit(hayError ? 1 : 0);
