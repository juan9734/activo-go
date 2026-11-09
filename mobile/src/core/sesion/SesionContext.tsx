import { createContext, useContext, useEffect, useState, type ReactElement, type ReactNode } from 'react';

import type { Usuario } from '../../features/auth/domain/usuario';
import { sesionRepository } from '../di/composicion';
import { tokenStore } from '../storage/token-store';

interface SesionContextValor {
  usuario: Usuario | null;
  cargandoInicial: boolean;
  iniciarSesion: (email: string, password: string) => Promise<void>;
  cerrarSesion: () => Promise<void>;
}

const SesionContext = createContext<SesionContextValor | null>(null);

export function SesionProvider({ children }: { children: ReactNode }): ReactElement {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargandoInicial, setCargandoInicial] = useState(true);

  useEffect(() => {
    tokenStore.obtenerAccessToken().then((token) => {
      // Nota: en esta versión mínima no se restaura el usuario completo al reabrir la app
      // (brecha declarada); solo se mantiene el token para que las llamadas sigan autenticadas.
      if (!token) setUsuario(null);
      setCargandoInicial(false);
    });
  }, []);

  async function iniciarSesion(email: string, password: string) {
    const resultado = await sesionRepository.iniciarSesion(email, password);
    await tokenStore.guardar(resultado.accessToken, resultado.refreshToken);
    setUsuario(resultado.usuario);
  }

  async function cerrarSesion() {
    await sesionRepository.cerrarSesion();
    await tokenStore.limpiar();
    setUsuario(null);
  }

  return (
    <SesionContext.Provider value={{ usuario, cargandoInicial, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  );
}

// El hook vive junto al proveedor: es la API pública de este módulo.
// eslint-disable-next-line react-refresh/only-export-components
export function useSesion(): SesionContextValor {
  const contexto = useContext(SesionContext);
  if (!contexto) throw new Error('useSesion debe usarse dentro de SesionProvider');
  return contexto;
}
