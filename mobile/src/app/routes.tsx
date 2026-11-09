import { IonRouterOutlet } from '@ionic/react';
import type { ReactElement, ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { useSesion } from '../core/sesion/SesionContext';
import CapturaFotoPage from '../features/activos/presentation/CapturaFotoPage';
import DetalleActivoPage from '../features/activos/presentation/DetalleActivoPage';
import EscanearQrPage from '../features/activos/presentation/EscanearQrPage';
import FormularioActivoPage from '../features/activos/presentation/FormularioActivoPage';
import ListaActivosPage from '../features/activos/presentation/ListaActivosPage';
import LoginPage from '../features/auth/presentation/LoginPage';

function AuthGuard({ children }: { children: ReactNode }) {
  const { usuario, cargandoInicial } = useSesion();
  if (cargandoInicial) return null;
  if (!usuario) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// Tabla de rutas central — debe coincidir con docs/01-arquitectura/navegacion.md
export function AppRoutes(): ReactElement {
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
        path="/activos/nuevo"
        element={
          <AuthGuard>
            <FormularioActivoPage />
          </AuthGuard>
        }
      />
      <Route
        path="/activos/escanear"
        element={
          <AuthGuard>
            <EscanearQrPage />
          </AuthGuard>
        }
      />
      <Route
        path="/activos/:id/editar"
        element={
          <AuthGuard>
            <FormularioActivoPage />
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
      <Route
        path="/activos/:id"
        element={
          <AuthGuard>
            <DetalleActivoPage />
          </AuthGuard>
        }
      />
      <Route path="/" element={<Navigate to="/activos" replace />} />
    </IonRouterOutlet>
  );
}
