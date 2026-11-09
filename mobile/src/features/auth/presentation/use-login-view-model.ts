import { useState } from 'react';

import { esErrorSinConexion, estadoHttp } from '../../../core/errores/errores-http';
import { useSesion } from '../../../core/sesion/SesionContext';

export type FaseLogin = 'inactivo' | 'enviando' | 'error' | 'bloqueado';

export interface LoginViewModel {
  fase: FaseLogin;
  mensajeError: string | null;
  enviar: (email: string, password: string) => Promise<void>;
}

export function useLoginViewModel(): LoginViewModel {
  const { iniciarSesion } = useSesion();
  const [fase, setFase] = useState<FaseLogin>('inactivo');
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  async function enviar(email: string, password: string) {
    setFase('enviando');
    setMensajeError(null);
    try {
      await iniciarSesion(email, password);
      setFase('inactivo');
    } catch (err) {
      if (estadoHttp(err) === 423) {
        setFase('bloqueado');
        setMensajeError('Cuenta bloqueada temporalmente, intenta más tarde');
      } else if (esErrorSinConexion(err)) {
        setFase('error');
        setMensajeError('Sin conexión, intenta de nuevo');
      } else {
        setFase('error');
        setMensajeError('Usuario o contraseña incorrectos');
      }
    }
  }

  return { fase, mensajeError, enviar };
}
