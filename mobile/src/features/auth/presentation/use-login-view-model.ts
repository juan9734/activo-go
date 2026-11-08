import { useState } from 'react';
import { useSesion } from '../../../core/sesion/SesionContext';
import axios from 'axios';

export type FaseLogin = 'inactivo' | 'enviando' | 'error' | 'bloqueado';

export function useLoginViewModel() {
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
      if (axios.isAxiosError(err) && err.response?.status === 423) {
        setFase('bloqueado');
        setMensajeError('Cuenta bloqueada temporalmente, intenta más tarde');
      } else if (axios.isAxiosError(err) && !err.response) {
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
