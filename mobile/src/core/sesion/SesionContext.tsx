import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { tokenStore } from '../storage/token-store';
import { sesionRepository } from '../di/composicion';
import type { Usuario } from '../../features/auth/domain/usuario';

interface SesionContextValor {
  usuario: Usuario | null;
  cargandoInicial: boolean;
  iniciarSesion: (email: string, password: string) => Promise<void>;
  cerrarSesion: () => Promise<void>;
}

const SesionContext = createContext<SesionContextValor | null>(null);

export function SesionProvider({ children }: { children: ReactNode }) {
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

export function useSesion() {
  const contexto = useContext(SesionContext);
  if (!contexto) throw new Error('useSesion debe usarse dentro de SesionProvider');
  return contexto;
}
