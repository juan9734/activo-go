import { Navigate, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import type { ReactNode } from 'react';
import { useSesion } from '../core/sesion/SesionContext';
import LoginPage from '../features/auth/presentation/LoginPage';
import ListaActivosPage from '../features/activos/presentation/ListaActivosPage';
import CapturaFotoPage from '../features/activos/presentation/CapturaFotoPage';

function AuthGuard({ children }: { children: ReactNode }) {
  const { usuario, cargandoInicial } = useSesion();
  if (cargandoInicial) return null;
  if (!usuario) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// Tabla de rutas central — debe coincidir con docs/01-arquitectura/navegacion.md
export function AppRoutes() {
  return (
    <IonRouterOutlet>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/activos"
        element={
          <AuthGuard>
            <ListaActivosPage />
          </AuthGuard>
        }
      />
      <Route
        path="/activos/:id/foto"
        element={
          <AuthGuard>
            <CapturaFotoPage />
          </AuthGuard>
        }
      />
      <Route path="/" element={<Navigate to="/activos" replace />} />
    </IonRouterOutlet>
  );
}
