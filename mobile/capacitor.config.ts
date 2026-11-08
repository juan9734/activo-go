import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.edu.corhuila.activogo',
  appName: 'mobile',
  webDir: 'dist',
  // La app se sirve en https://localhost; el API de desarrollo vive en
  // http://10.0.2.2:3000 (ver CLAUDE.md), así que el WebView bloquea la
  // petición como "mixed content" sin este flag. En producción la API es
  // HTTPS y el problema no existe: quitar este flag antes del release
  // v1.0.0 (ver checklist de release).
  android: {
    allowMixedContent: true,
  },
};

export default config;
