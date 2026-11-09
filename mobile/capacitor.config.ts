import type { CapacitorConfig } from '@capacitor/cli';

// Release: `ACTIVOGO_RELEASE=1 npx cap sync android` desactiva el contenido mixto (la API de
// producción va por HTTPS). Sin esa variable (desarrollo) se permite que el WebView, servido en
// https://localhost, llame a la API de desarrollo en http://10.0.2.2:3000.
const esRelease = process.env.ACTIVOGO_RELEASE === '1';

const config: CapacitorConfig = {
  appId: 'co.edu.corhuila.activogo',
  appName: 'ActivoGo',
  webDir: 'dist',
  android: {
    allowMixedContent: !esRelease,
  },
};

export default config;
