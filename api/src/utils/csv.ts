const CARACTERES_PELIGROSOS = ["=", "+", "-", "@"];

/**
 * Neutraliza inyección de fórmulas CSV (OWASP CSV Injection): si un campo empieza
 * con =, +, - o @, Excel/Sheets puede interpretarlo como fórmula al abrirlo.
 * Se antepone un apóstrofe para forzar que se lea como texto.
 */
export function neutralizarCampoCsv(valor: string): string {
  if (CARACTERES_PELIGROSOS.includes(valor.charAt(0))) {
    return `'${valor}`;
  }
  return valor;
}

function escaparCampoCsv(valorCrudo: string): string {
  const valor = neutralizarCampoCsv(valorCrudo);
  if (/[",\n]/.test(valor)) {
    return `"${valor.replace(/"/g, '""')}"`;
  }
  return valor;
}

export function filasACsv(encabezados: string[], filas: string[][]): string {
  const lineas = [encabezados, ...filas].map((fila) => fila.map(escaparCampoCsv).join(","));
  return lineas.join("\r\n") + "\r\n";
}
